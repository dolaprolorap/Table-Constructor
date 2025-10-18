<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $title
 *
 * @property-read TableColumn[] $tableColumns
 * @property-read TableRow[] $tableRows
 */
final class Table extends Model
{
    use SoftDeletes;

    protected $table = 'tables';

    public function tableColumns(): HasMany
    {
        return $this->hasMany(TableColumn::class);
    }

    public function tableRows(): HasMany
    {
        return $this->hasMany(TableRow::class);
    }
}
