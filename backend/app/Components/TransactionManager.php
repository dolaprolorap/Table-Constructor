<?php

declare(strict_types=1);

namespace App\Components;

use App\Exceptions\InfrastructureException;
use Closure;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Throwable;

final readonly class TransactionManager
{
    /**
     * @throws InfrastructureException
     */
    public function run(Closure $callback)
    {
        try {
            return DB::transaction($callback);
        } catch (Throwable) {
            throw new InfrastructureException(
                message: 'Ошибка выполнения транзакции',
            );
        }
    }

    /**
     * @throws InfrastructureException
     */
    public function beginTransaction(): Transaction
    {
        /** @var Transaction $transaction */
        $transaction = App::make(Transaction::class);
        $transaction->begin();

        return $transaction;
    }
}
