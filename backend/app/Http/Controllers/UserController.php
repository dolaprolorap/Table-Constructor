<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\BusinessLogicException;
use App\Exceptions\InfrastructureException;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Throwable;
use UserResponseHandler;

final readonly class UserController
{
    public function __construct(
        private UserService $userService,
        private UserResponseHandler $responseHandler,
    ) {
    }

    public function login(LoginRequest $request): string
    {
        return $this->userService->login($request);
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
}
