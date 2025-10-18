<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\BusinessLogicException;
use App\Exceptions\InfrastructureException;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\PaginateAllUsersRequest;
use App\Services\UserService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Throwable;
use App\Http\Responses\Handlers\UserResponseHandler;

final readonly class UserController
{
    public function __construct(
        private UserService $userService,
        private UserResponseHandler $responseHandler,
    ) {
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = $this->userService->login($request);

        return $this->responseHandler->handleLogin($user);
    }

    /**
     * @throws BusinessLogicException
     * @throws Throwable
     * @throws InfrastructureException
     */
    public function create(CreateUserRequest $request): JsonResponse
    {
        $user = $this->userService->create($request);

        return $this->responseHandler->handleCreate($user);
    }

    public function logout(FormRequest $request): JsonResponse
    {
        $this->userService->logout($request->user());

        return $this->responseHandler->handleLogout();
    }

    public function paginateAll(PaginateAllUsersRequest $request): JsonResponse
    {
        $paginator = $this->userService->paginateAll($request);

        return $this->responseHandler->handlePaginateAll($paginator);
    }

    public function delete(int $userId): JsonResponse
    {
        $this->userService->delete($userId);

        return $this->responseHandler->handleDelete();
    }
}
