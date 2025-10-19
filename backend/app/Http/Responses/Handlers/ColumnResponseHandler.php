<?php

declare(strict_types=1);

namespace App\Http\Responses\Handlers;

use App\Enums\HttpStatusCodeEnum;
use App\Models\TableColumn;
use Illuminate\Http\JsonResponse;

final readonly class ColumnResponseHandler
{
    public function createHandler(TableColumn $tableColumn): JsonResponse
    {
        return response()->json([
            'id' => $tableColumn->id
        ], HttpStatusCodeEnum::CREATED->value);
    }

    public function updateHandler(): JsonResponse
    {
        return response()->json(status: HttpStatusCodeEnum::NO_CONTENT->value);
    }

    public function deleteHandler(): JsonResponse
    {
        return response()->json(status: HttpStatusCodeEnum::NO_CONTENT->value);
    }
}
