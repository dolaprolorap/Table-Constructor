<?php

declare(strict_types=1);

namespace App\Http\Requests\Tables;

use App\Http\Requests\JsonDataRequest;

/**
 * @property int $id
 * @property string $title
 */
final class UpdateTableRequest extends JsonDataRequest
{
    public function rules(): array
    {
        return [
            'title' => 'required|string',
        ];
    }
}
