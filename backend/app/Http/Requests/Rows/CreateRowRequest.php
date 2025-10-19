<?php

declare(strict_types=1);

namespace App\Http\Requests\Rows;

use App\Http\Requests\JsonDataRequest;

/**
 * @property int $table_id
 * @property string $data
 */
final class CreateRowRequest extends JsonDataRequest
{
    public function rules(): array
    {
        return [
            'table_id' => 'required|int',
            'data' => 'required|string',
        ];
    }
}
