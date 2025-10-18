<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Domain\RolesEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @property ?int $page
 * @property ?int $pageSize
 * @property ?string $login
 * @property ?string $role
 */
final class PaginateAllUsersRequest extends FormRequest
{
    private const AVAILABLE_ROLES = [
        RolesEnum::ADMIN->value,
        RolesEnum::EDITOR->value,
        RolesEnum::VIEWER->value,
    ];

    public function rules(): array
    {
        return [
            'login' => 'nullable|string',
            'role' => [Rule::in(self::AVAILABLE_ROLES)],
            'page' => 'nullable|string',
            'pageSize' => 'nullable|string',
        ];
    }
}
