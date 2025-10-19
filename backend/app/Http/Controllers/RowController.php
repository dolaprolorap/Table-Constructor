<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Rows\CreateRowRequest;
use App\Http\Requests\Rows\PaginateAllRowsRequest;
use App\Http\Requests\Rows\UpdateRowRequest;
use App\Http\Responses\Handlers\RowResponseHandler;
use App\Services\RowService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

final readonly class RowController
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

    public function update(int $rowId, UpdateRowRequest $request): JsonResponse
    {
        $request->id = $rowId;

        $row = $this->rowService->update($request);

        return $this->responseHandler->handleUpdate($row);
    }

    public function delete(int $rowId, Request $request): JsonResponse
    {
        $this->rowService->delete($rowId, $request->user()->id);

        return $this->responseHandler->handleDelete();
    }
}
