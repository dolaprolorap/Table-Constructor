<?php

namespace App\Policies;

use App\Models\User;
use App\Services\UserRoleCheckService;

final readonly class UserPolicy
{
    public function __construct(
        private UserRoleCheckService $userRoleCheckService,
    ) {
    }

    public function login(User $user): bool
    {
        return true;
    }

    public function logout(User $user): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $this->userRoleCheckService->isAdmin($user->id);
    }

    public function paginateAll(User $user): bool
    {
        return $this->userRoleCheckService->isAdmin($user->id);
    }

    public function delete(User $user): bool
    {
        return $this->userRoleCheckService->isAdmin($user->id);
    }
}
