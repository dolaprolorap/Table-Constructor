<?php

declare(strict_types=1);

namespace App\Http\Requests\Columns;

use App\Http\Requests\JsonDataRequest;

/**
 * @property int $table_id
 * @property string $title
 * @property string $type
 * @property ?string[] $enum
 */
final class CreateColumnRequest extends JsonDataRequest
{
    public function rules(): array
    {
        return [
            'table_id' => 'required|int',
            'title' => 'required|string',
            'type' => 'required|string',
            'enum' => 'nullable|array',
        ];
    }
}
