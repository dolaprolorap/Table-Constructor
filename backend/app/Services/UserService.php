<?php

declare(strict_types=1);

namespace App\Services;

use App\Components\TransactionManager;
use App\Exceptions\BusinessLogicException;
use App\Exceptions\InfrastructureException;
use App\Http\Requests\CreateUserRequest;
use app\Http\Requests\LoginRequest;
use App\Models\Role;
use App\Models\User;
use App\Models\UserInfo;
use App\Models\UserRole;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\UnauthorizedException;
use Throwable;

final readonly class UserService
{
    public function __construct(
        private TransactionManager $transactionManager,
    ) {
    }

    public function login(LoginRequest $request): string
    {
        /** @var User $user */
        $user = User::where(
            'login',
            $request->login,
        )->first();

        if (Hash::check($request->password, $user->password)) {
            return $user->createToken('token')->plainTextToken;
        }

        throw new UnauthorizedException();
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

        $user = User::insert([
            'login' => $request->login,
            'password' => Hash::make($request->password),
        ]);

        $userInfo = UserInfo::insert([
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'user_id' => $user->id,
        ]);

        $role = Role::where('slug', $request->role)->first();

        $userRole = UserRole::insert([
            'user_id' => $user->id,
            'role_id' => $role->id
        ]);

        return $user;
    }
}
