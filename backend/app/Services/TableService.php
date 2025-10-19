<?php

declare(strict_types=1);

namespace App\Services;

use App\Components\TransactionManager;
use App\Exceptions\BusinessLogicException;
use App\Exceptions\InfrastructureException;
use App\Exceptions\NotFoundException;
use App\Http\Requests\Tables\CreateTableRequest;
use App\Http\Requests\Tables\PaginateAllTablesRequest;
use App\Http\Requests\Tables\UpdateTableRequest;
use App\Models\Table;
use App\Models\TableColumn;
use Illuminate\Pagination\LengthAwarePaginator;
use Throwable;

final readonly class TableService
{
    private const DEFAULT_PAGE = 1;
    private const DEFAULT_PAGE_SIZE = 10;

    public function __construct(
        private TransactionManager $transactionManager
    ) {
    }

    public function paginateAll(PaginateAllTablesRequest $request): LengthAwarePaginator
    {
        $query = Table::query();
        $query->orderBy('id');

        if ($request->title !== null) {
            $query->where(
                'title',
                'ILIKE',
                sprintf('%%%s%%', $request->title)
            );
        }

        $page = $request->page ?? self::DEFAULT_PAGE;
        $pageSize = $request->pageSize ?? self::DEFAULT_PAGE_SIZE;

        return $query->paginate(perPage: $pageSize, page: $page);
    }

    /**
     * @throws InfrastructureException
     * @throws BusinessLogicException
     * @throws Throwable
     */
    public function create(CreateTableRequest $request): Table
    {
        $transaction = $this->transactionManager->beginTransaction();

        try {
            $table = $this->doCreate($request);
        } catch (Throwable $e) {
            $transaction->rollback();

            throw $e;
        }

        $transaction->commit();

        return $table;
    }

    /**
     * @throws NotFoundException
     */
    public function findOne(int $tableId): Table
    {
        /** @var Table $table */
        $table = Table::find($tableId);

        if ($table === null) {
            throw new NotFoundException('Таблица не найдена');
        }

        return $table;
    }

    /**
     * @throws NotFoundException
     */
    public function update(UpdateTableRequest $request): Table
    {
        /** @var Table $table */
        $table = Table::find($request->id);

        if ($table === null) {
            throw new NotFoundException('Таблица не найдена');
        }

        $table->title = $request->title;

        $table->save();

        return $table;
    }

    /**
     * @throws NotFoundException
     */
    public function delete(int $tableId): void
    {
        /** @var Table $table */
        $table = Table::find($tableId);

        if ($table === null) {
            throw new NotFoundException('Таблица не найдена');
        }

        $table->delete();
    }

    private function doCreate(CreateTableRequest $request): Table
    {
        $table = new Table();

        $table->title = $request->title;

        $table->save();

        $columns = [];

        foreach ($request->columns as $column) {
            $columns[] = $this->columnDataToModel($column, $table->id);
        }

        $table->tableColumns()->saveMany($columns);

        return $table;
    }

    private function columnDataToModel(array $data, int $tableId): TableColumn
    {
        $column = new TableColumn();

        $column->table_id = $tableId;
        $column->title = $data['title'];
        $column->type = $data['type'];
        $column->enum = $data['enum'];

        return $column;
    }
}
