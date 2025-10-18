<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $id
 * @property string $login
 * @property string $password
 * @property ?Carbon $created_at
 * @property ?Carbon $updated_at
 *
 * @property-read Role[] $roles
 * @property-read UserInfo $userInfo
 */
final class User extends Authenticatable
{
    use HasApiTokens;

    public function roles(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                'roles',
                'users_roles',
                'user_id',
                'role_id'
            )
            ->withTimestamps()
            ->select('roles.*');
    }

    public function userInfo(): HasOne
    {
        return $this->hasOne(UserInfo::class);
    }
}
