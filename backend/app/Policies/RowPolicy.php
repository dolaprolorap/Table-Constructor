<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\TableRow;
use App\Models\User;

final readonly class RowPolicy
{
    public function paginateAll(User $user): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, TableRow $row): bool
    {
        return true;
    }

    public function delete(User $user): bool
    {
        return true;
    }
}
