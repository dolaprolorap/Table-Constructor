<?php

declare(strict_types=1);

namespace App\Http\Requests\Rows;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property ?bool $deleted
 * @property ?int $page
 * @property ?int $pageSize
 * @property ?int $table_id
 */
final class PaginateAllRowsRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'deleted' => 'nullable|in:1,0',
            'page' => 'nullable|int',
            'pageSize' => 'nullable|int',
            'table_id' => 'nullable|int',
        ];
    }
}
