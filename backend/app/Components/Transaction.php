<?php

declare(strict_types=1);

namespace App\Components;

use App\Exceptions\InfrastructureException;
use Illuminate\Support\Facades\DB;
use Throwable;

final class Transaction
{
    /**
     * @throws InfrastructureException
     */
    public function begin(): void
    {
        try {
            DB::beginTransaction();
        } catch (Throwable $e) {
            throw new InfrastructureException(
                message: $e->getMessage(),
            );
        }
    }

    /**
     * @throws InfrastructureException
     */
    public function commit(): void
    {
        try {
            DB::commit();
        } catch (Throwable $e) {
            throw new InfrastructureException(
                message: $e->getMessage(),
            );
        }
    }

    /**
     * @throws InfrastructureException
     */
    public function rollback(): void
    {
        try {
            DB::rollBack();
        } catch (Throwable $e) {
            throw new InfrastructureException(
                message: $e->getMessage(),
            );
        }
    }
}
