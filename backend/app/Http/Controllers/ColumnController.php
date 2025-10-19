<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Columns\CreateColumnRequest;
use App\Http\Requests\Columns\UpdateColumnRequest;
use App\Http\Responses\Handlers\ColumnResponseHandler;
use App\Services\ColumnService;
use Illuminate\Http\JsonResponse;

final readonly class ColumnController
{
    public function __construct(
        private ColumnService $columnService,
        private ColumnResponseHandler $responseHandler
    ) {
    }

    public function create(CreateColumnRequest $request): JsonResponse
    {
        $tableColumn = $this->columnService->create($request);

        return $this->responseHandler->createHandler($tableColumn);
    }

    public function update(int $columnId, UpdateColumnRequest $request): JsonResponse
    {
        $request->id = $columnId;

        $this->columnService->update($request);

        return $this->responseHandler->updateHandler();
    }

    public function delete(int $columnId): JsonResponse
    {
        $this->columnService->delete($columnId);

        return $this->responseHandler->deleteHandler();
    }
}
