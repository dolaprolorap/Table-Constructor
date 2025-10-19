<?php

declare(strict_types=1);

namespace App\Services;

use App\Http\Requests\Rows\CreateRowRequest;
use App\Http\Requests\Rows\PaginateAllRowsRequest;
use App\Http\Requests\Rows\UpdateRowRequest;
use App\Models\TableRow;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class RowService
{
    private const DEFAULT_PAGE = 1;
    private const DEFAULT_PAGE_SIZE = 10;

    public function paginateAll(PaginateAllRowsRequest $request): LengthAwarePaginator
    {
        $query = TableRow::query();

        if ($request->table_id !== null) {
            $query->where('table_id', $request->table_id);
        }

        $page = $request->page ?? self::DEFAULT_PAGE;
        $pageSize = $request->pageSize ?? self::DEFAULT_PAGE_SIZE;

        return $query->paginate(perPage: $pageSize, page: $page);
    }

    public function create(CreateRowRequest $request): TableRow
    {
        $tableRow = new TableRow();

        $tableRow->table_id = $request->table_id;
        $tableRow->data = $request->data;
        $tableRow->created_at = Carbon::now();
        $tableRow->created_by = $request->user()->id;

        $tableRow->save();

        return $tableRow;
    }

    public function update(UpdateRowRequest $request): TableRow
    {
        /** @var TableRow $tableRow */
        $tableRow = TableRow::find($request->id);

        $tableRow->data = $request->data;

        $tableRow->save();

        return $tableRow;
    }

    public function delete(int $rowId, int $userId): void
    {
        /** @var TableRow $tableRow */
        $tableRow = TableRow::find($rowId);

        $tableRow->deleted_by = $userId;
        $tableRow->save();

        $tableRow->delete();
    }
}
