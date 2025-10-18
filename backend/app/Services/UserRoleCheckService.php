<?php

declare(strict_types=1);

namespace App\Services;

use App\Domain\RolesEnum;
use App\Models\User;

final readonly class UserRoleCheckService
{
    public function isAdmin(int $userId): bool
    {
        return $this->hasRole($userId, RolesEnum::ADMIN->value);
    }

    public function isEditor(int $userId): bool
    {
        return $this->hasRole($userId, RolesEnum::EDITOR->value);
    }

    public function isViewer(int $userId): bool
    {
        return $this->hasRole($userId, RolesEnum::VIEWER->value);
    }

    private function hasRole(int $userId, string $roleSlug): bool
    {
        /** @var User $user */
        $user = User::find($userId);
        $userRoles = $user->roles;
        $userRoleSlugs = array_column($userRoles, 'slug');

        return in_array($roleSlug, $userRoleSlugs, true);
    }
}
