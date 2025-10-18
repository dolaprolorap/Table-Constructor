<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $first_name
 * @property string $last_name
 * @property string $middle_name
 * @property int $user_id
 *
 * @property-read User $user
 */
final class UserInfo extends Model
{
    protected $table = 'user_infos';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
