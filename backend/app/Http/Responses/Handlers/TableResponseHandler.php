<?php

declare(strict_types=1);

namespace App\Http\Responses\Handlers;

use App\Enums\HttpStatusCodeEnum;
use App\Models\Table;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class TableResponseHandler
{
    public function handlePaginateAll(LengthAwarePaginator $paginator): JsonResponse
    {
        /** @var Table[] $tables*/
        $tables = $paginator->items();
        $tableData = [];

        foreach ($tables as $table) {
            $tableData[] = [
                'id' => $table->id,
                'title' => $table->title,
            ];
        }

        return response()->json([
            'data' => $tableData,
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

    public function handleCreate(Table $table): JsonResponse
    {
        return response()->json([
            'data' => [
                'id' => $table->id
            ],
        ], HttpStatusCodeEnum::CREATED->value);
    }

    public function handleFindOne(Table $table): JsonResponse
    {
        $columns = [];
        $tableColumns = $table->tableColumns;

        foreach ($tableColumns as $tableColumn) {
            $columns[] = [
                'title' => $tableColumn->title,
                'type' => $tableColumn->type,
                'enum' => $tableColumn->enum
            ];
        }

        return response()->json([
            'data' => [
                'title' => $table->title,
                'columns' =>$columns,
            ],
        ]);
    }

    public function handleUpdate(): JsonResponse
    {
        return response()->json(status: HttpStatusCodeEnum::NO_CONTENT->value);
    }

    public function handleDelete(): JsonResponse
    {
        return response()->json(status: HttpStatusCodeEnum::NO_CONTENT->value);
    }
}
