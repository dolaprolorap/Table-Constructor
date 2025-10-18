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

    public function create(User $user): bool
    {
        return $this->userRoleCheckService->isAdmin($user->id);
    }
}
