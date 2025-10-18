<?php

declare(strict_types=1);

namespace App\Http\Requests\Tables;

use App\Http\Requests\JsonDataRequest;

/**
 * @property string $title
 * @property array{
 *     title: string,
 *     type: string,
 *     enum: string[]
 * }[] $columns
 */
final class CreateTableRequest extends JsonDataRequest
{
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'columns' => 'required|array',
        ];
    }
}
