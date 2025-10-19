<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property int $table_id
 * @property string $data
 * @property int $created_by
 * @property Carbon $created_at
 * @property ?int $deleted_by
 * @property ?Carbon $deleted_at
 *
 * @property-read LoggedTableRow[] $loggedTableRows
 */
final class TableRow extends Model
{
    use SoftDeletes;

    protected $table = 'table_rows';

    public $timestamps = false;

    public function loggedTableRows(): HasMany
    {
        return $this->hasMany(LoggedTableRow::class);
    }
}
