<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Domain\RolesEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @property string $login
 * @property string $role
 * @property string $first_name
 * @property string $last_name
 * @property string $middle_name
 * @property string $password
 */
final class CreateUserRequest extends FormRequest
{
    private const AVAILABLE_ROLES = [
        RolesEnum::ADMIN->value,
        RolesEnum::EDITOR->value,
        RolesEnum::VIEWER->value,
    ];

    public function rules(): array
    {
        return [
            'login' => 'required|string',
            'role' => [Rule::in(self::AVAILABLE_ROLES)],
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'middle_name' => 'required|string',
            'password' => 'required|string',
        ];
    }
}
