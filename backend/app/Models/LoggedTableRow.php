<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $table_row_id
 * @property string $logged_data
 * @property int $logged_by
 * @property Carbon $logged_at
 */
final class LoggedTableRow extends Model
{
    protected $table = 'logged_table_rows';
}
