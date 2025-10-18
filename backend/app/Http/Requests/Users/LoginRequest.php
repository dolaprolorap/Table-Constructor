<?php

declare(strict_types=1);

namespace App\Http\Requests\Users;

use App\Http\Requests\JsonDataRequest;

/**
 * @property string $login
 * @property string $password
 */
final class LoginRequest extends JsonDataRequest
{
    public function rules(): array
    {
        return [
            'login' => 'required|string',
            'password' => 'required|string',
        ];
    }
}
