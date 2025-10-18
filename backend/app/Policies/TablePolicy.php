<?php

namespace App\Policies;

use App\Models\User;
use App\Services\UserRoleCheckService;

final readonly class TablePolicy
{
    public function __construct(
        private UserRoleCheckService $userRoleCheckService,
    ) {
    }

    public function paginateAll(User $user): bool
    {
        return true;
    }

    public function findOne(User $user): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $this->userRoleCheckService->isAdmin($user->id);
    }

    public function update(User $user): bool
    {
        return $this->userRoleCheckService->isAdmin($user->id);
    }

    public function delete(User $user): bool
    {
        return $this->userRoleCheckService->isAdmin($user->id);
    }
}
