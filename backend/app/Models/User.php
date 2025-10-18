<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $id
 * @property string $login
 * @property string $password
 * @property int $role_id
 * @property ?Carbon $created_at
 * @property ?Carbon $updated_at
 * @property ?string $plainToken
 *
 * @property-read Role $role
 * @property-read UserInfo $userInfo
 */
final class User extends Authenticatable
{
    use HasApiTokens, SoftDeletes;

    private ?string $plainToken;

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function userInfo(): HasOne
    {
        return $this->hasOne(UserInfo::class);
    }

    public function getPlainTokenAttribute(): ?string
    {
        return $this->plainToken;
    }

    public function setPlainTokenAttribute(?string $value): void
    {
        $this->plainToken = $value;
    }
}
