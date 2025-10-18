<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

final readonly class UserResponseHandler
{
    public function handleCreate(User $user): JsonResponse
    {
        return response()->json([
            'id' => $user->id
        ]);
    }
}
