<?php

declare(strict_types=1);

namespace App\Http\Requests\Rows;

use App\Http\Requests\JsonDataRequest;

/**
 * @property int $id
 * @property string[] $data
 */
final class UpdateRowRequest extends JsonDataRequest
{
    public function rules(): array
    {
        return [
            'data' => 'required|string',
        ];
    }
}
