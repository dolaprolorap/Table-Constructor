<?php

declare(strict_types=1);

namespace App\Http\Requests\Tables;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property ?string $title
 * @property ?int $page
 * @property ?int $pageSize
 */
final class PaginateAllTablesRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'nullable|string',
            'page' => 'nullable|int',
            'pageSize' => 'nullable|int',
        ];
    }
}
