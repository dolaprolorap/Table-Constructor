<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Rows\CreateRowRequest;
use App\Http\Requests\Rows\PaginateAllRowsRequest;
use App\Http\Responses\Handlers\RowResponseHandler;
use App\Services\RowService;
use Illuminate\Http\JsonResponse;

final readonly class RowsController
{
    public function __construct(
        private RowResponseHandler $responseHandler,
        private RowService $rowService,
    ) {
    }

    public function paginateAll(PaginateAllRowsRequest $request): JsonResponse
    {
        $paginator = $this->rowService->paginateAll($request);

        return $this->responseHandler->handlePaginateAll($paginator);
    }

    public function create(CreateRowRequest $request): JsonResponse
    {
        $row = $this->rowService->create($request);

        return $this->responseHandler->handleCreate($row);
    }

    public function update(int $rowId): JsonResponse
    {
        $row = $this->rowService->update($rowId);

        return $this->responseHandler->handleUpdate($row);
    }

    public function delete(int $userId): JsonResponse
    {
        $this->rowService->delete($userId);

        return $this->responseHandler->handleDelete();
    }
}
