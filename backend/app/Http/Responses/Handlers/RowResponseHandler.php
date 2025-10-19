<?php

declare(strict_types=1);

namespace App\Http\Responses\Handlers;

use App\Enums\HttpStatusCodeEnum;
use App\Models\TableRow;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class RowResponseHandler
{
    public function handlePaginateAll(LengthAwarePaginator $paginator): JsonResponse
    {
        /** @var TableRow[] $rows */
        $rows = $paginator->items();

        $rowData = [];

        foreach ($rows as $row) {
            $rowData[] = [
                'id' => $row->id,
                'table_id' => $row->table_id,
                'data' => $row->data,
                'created_at' => $row->created_at,
                'created_by' => $row->created_by,
                'deleted_at' => $row->deleted_at,
                'deleted_by' => $row->deleted_by,
            ];
        }

        return response()->json([
            'data' => $rowData,
            'meta' => [
                'currentPage' => $paginator->currentPage(),
                'from' => $paginator->firstItem(),
                'lastPage' => $paginator->lastPage(),
                'perPage' => $paginator->perPage(),
                'to' => $paginator->lastItem(),
                'total' => $paginator->total(),
            ],
        ]);
    }

    public function handleCreate(TableRow $row): JsonResponse
    {
        return response()->json([
            'data' => [
                $row->id
            ],
        ], HttpStatusCodeEnum::CREATED->value);
    }

    public function handleUpdate(TableRow $row): JsonResponse
    {
        return response()->json(status: HttpStatusCodeEnum::NO_CONTENT->value);
    }

    public function handleDelete(): JsonResponse
    {
        return response()->json(status: HttpStatusCodeEnum::NO_CONTENT->value);
    }
}
