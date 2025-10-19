<?php

declare(strict_types=1);

namespace App\Services;

use App\Exceptions\NotFoundException;
use App\Http\Requests\Columns\CreateColumnRequest;
use App\Http\Requests\Columns\UpdateColumnRequest;
use App\Models\TableColumn;

final readonly class ColumnService
{
    public function create(CreateColumnRequest $request): TableColumn
    {
        $tableColumn = new TableColumn();

        $tableColumn->table_id = $request->table_id;
        $tableColumn->title = $request->title;
        $tableColumn->type = $request->type;
        $tableColumn->enum = $request->enum;

        $tableColumn->save();

        return $tableColumn;
    }

    /**
     * @throws NotFoundException
     */
    public function update(UpdateColumnRequest $request): TableColumn
    {
        /** @var TableColumn $tableColumn */
        $tableColumn = TableColumn::find($request->id);

        if ($tableColumn === null) {
            throw new NotFoundException('Колонка не найдена');
        }

        $tableColumn->table_id = $request->table_id;
        $tableColumn->title = $request->title;
        $tableColumn->type = $request->type;
        $tableColumn->enum = $request->enum;

        $tableColumn->save();

        return $tableColumn;
    }

    /**
     * @throws NotFoundException
     */
    public function delete(int $columnId): void
    {
        /** @var TableColumn $tableColumn */
        $tableColumn = TableColumn::find($columnId);

        if ($tableColumn === null) {
            throw new NotFoundException('Колонка не найдена');
        }

        $tableColumn->delete();
    }
}
