<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property int $table_id
 * @property string $title
 * @property string $type
 * @property ?string $enum
 */
final class TableColumn extends Model
{
    use SoftDeletes;

    protected $table = 'table_columns';

    protected $casts = [
        'enum' => 'array',
    ];
}
