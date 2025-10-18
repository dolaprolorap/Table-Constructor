<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

abstract class JsonDataRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        if (isset($this->data)) {
            $this->merge($this->data);
        }
    }
}
