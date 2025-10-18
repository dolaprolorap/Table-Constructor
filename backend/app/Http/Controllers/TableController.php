<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\BusinessLogicException;
use App\Exceptions\InfrastructureException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\Tables\CreateTableRequest;
use App\Http\Requests\Tables\PaginateAllTablesRequest;
use App\Http\Requests\Tables\UpdateTableRequest;
use App\Http\Responses\Handlers\TableResponseHandler;
use App\Services\TableService;
use Illuminate\Http\JsonResponse;
use Throwable;

final readonly class TableController
{
    public function __construct(
        private TableService $tableService,
        private TableResponseHandler $responseHandler
    ) {
    }

    public function paginateAll(PaginateAllTablesRequest $request): JsonResponse
    {
        $paginator = $this->tableService->paginateAll($request);

        return $this->responseHandler->handlePaginateAll($paginator);
    }

    /**
     * @throws BusinessLogicException
     * @throws Throwable
     * @throws InfrastructureException
     */
    public function create(CreateTableRequest $request): JsonResponse
    {
        $table = $this->tableService->create($request);

        return $this->responseHandler->handleCreate($table);
    }

    /**
     * @throws NotFoundException
     */
    public function findOne(int $tableId): JsonResponse
    {
        $table = $this->tableService->findOne($tableId);

        return $this->responseHandler->handleFindOne($table);
    }

    /**
     * @throws NotFoundException
     */
    public function update(int $tableId, UpdateTableRequest $request): JsonResponse
    {
        $request->id = $tableId;

        $this->tableService->update($request);

        return $this->responseHandler->handleUpdate();
    }

    /**
     * @throws NotFoundException
     */
    public function delete(int $userId): JsonResponse
    {
        $this->tableService->delete($userId);

        return $this->responseHandler->handleDelete();
    }
}
