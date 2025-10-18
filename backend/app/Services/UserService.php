<?php

declare(strict_types=1);

namespace App\Services;

use App\Components\TransactionManager;
use App\Exceptions\BusinessLogicException;
use App\Exceptions\InfrastructureException;
use App\Http\Requests\Users\CreateUserRequest;
use App\Http\Requests\Users\LoginRequest;
use App\Http\Requests\Users\PaginateAllUsersRequest;
use App\Models\PersonalAccessToken;
use App\Models\Role;
use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\UnauthorizedException;
use Throwable;

final readonly class UserService
{
    private const AUTH_TOKEN = 'auth_token';

    private const DEFAULT_PAGE = 1;
    private const DEFAULT_PAGE_SIZE = 10;

    public function __construct(
        private TransactionManager $transactionManager,
    ) {
    }

    public function login(LoginRequest $request): User
    {
        /** @var User $user */
        $user = User::where(
            'login',
            $request->login,
        )->first();

        if (Hash::check($request->password, $user->password)) {
            $plainTextToken = $user->createToken(self::AUTH_TOKEN)->plainTextToken;

            $user->plainToken = $plainTextToken;

            return $user;
        }

        throw new UnauthorizedException('Неверный логин или пароль');
    }

    /**
     * @throws InfrastructureException
     * @throws BusinessLogicException
     * @throws Throwable
     */
    public function create(CreateUserRequest $request): User
    {
        $transaction = $this->transactionManager->beginTransaction();

        try {
            $user = $this->doCreate($request);
        } catch (BusinessLogicException | Throwable $e) {
            $transaction->rollback();

            throw $e;
        }

        $transaction->commit();

        return $user;
    }

    public function logout(User $user): void
    {
        PersonalAccessToken::query()
            ->where('tokenable_type', User::class)
            ->where('tokenable_id', $user->id)
            ->delete();
    }

    public function paginateAll(PaginateAllUsersRequest $request): LengthAwarePaginator
    {
        $query = User::query();

        if ($request->login !== null) {
            $query->where(
                'login',
                'ILIKE',
                sprintf('%%%s%%', $request->login)
            );
        }

        if ($request->role !== null) {
            $role = Role::where('slug', $request->role)->first();

            $query->where(
                'role_id',
                $role->id
            );
        }

        $page = $request->page ?? self::DEFAULT_PAGE;
        $pageSize = $request->pageSize ?? self::DEFAULT_PAGE_SIZE;

        return $query->paginate(perPage: $pageSize, page: $page);
    }

    public function delete(int $userId): void
    {
        /** @var User $user */
        $user = User::find($userId);

        $user?->delete();
    }

    /**
     * @throws BusinessLogicException
     */
    private function doCreate(CreateUserRequest $request): User
    {
        /** @var User $user */
        $user = User::where('login', $request->login)->first();

        if ($user !== null) {
            throw new BusinessLogicException(
                sprintf('Логин %s уже занят', $request->login)
            );
        }

        $role = Role::where('slug', $request->role)->first();

        $user = new User();

        $user->login = $request->login;
        $user->password = Hash::make($request->password);
        $user->role_id = $role->id;

        $user->save();

        $userInfo = new UserInfo();

        $userInfo->last_name = $request->last_name;
        $userInfo->first_name = $request->first_name;
        $userInfo->middle_name = $request->middle_name;

        $user->userInfo()->save($userInfo);

        return $user;
    }
}
