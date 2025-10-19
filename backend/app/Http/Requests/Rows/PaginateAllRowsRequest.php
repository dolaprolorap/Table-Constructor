<?php

declare(strict_types=1);

namespace App\Http\Requests\Rows;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property ?string $search_string
 * @property ?bool $deleted
 * @property ?int $page
 * @property ?int $pageSize
 */
final class PaginateAllRowsRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'search_string' => 'nullable|string',
            'deleted' => 'nullable|in:1,0',
            'page' => 'nullable|int',
            'pageSize' => 'nullable|int',
        ];
    }
}
