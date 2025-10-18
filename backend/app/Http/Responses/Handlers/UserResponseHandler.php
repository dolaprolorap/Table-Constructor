<?php

declare(strict_types=1);

namespace App\Http\Responses\Handlers;

use App\Enums\HttpStatusCodeEnum;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class UserResponseHandler
{
    public function handleLogin(User $user): JsonResponse
    {
        return response()->json([
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'login' => $user->login,
                    'first_name' => $user->userInfo->first_name,
                    'last_name' => $user->userInfo->last_name,
                    'middle_name' => $user->userInfo->middle_name,
                    'role' => $user->role->slug,
                ],
                'token' => $user->plainToken,
            ]
        ], HttpStatusCodeEnum::OK->value);
    }

    public function handleCreate(User $user): JsonResponse
    {
        return response()->json([
            'data' => [
                'id' => $user->id
            ]
        ], HttpStatusCodeEnum::CREATED->value);
    }

    public function handleLogout(): JsonResponse
    {
        return response()->json(status: HttpStatusCodeEnum::NO_CONTENT->value);
    }

    public function handlePaginateAll(LengthAwarePaginator $paginator): JsonResponse
    {
        /** @var User[] $users */
        $users = $paginator->items();
        $userData = [];

        foreach ($users as $user) {
            $userData[] = [
                'id' => $user->id,
                'login' => $user->login,
                'first_name' => $user->userInfo->first_name,
                'last_name' => $user->userInfo->last_name,
                'middle_name' => $user->userInfo->middle_name,
                'role' => $user->role->slug,
            ];
        }

        return response()->json([
            'data' => $userData,
            'meta' => [
                'currentPage' => $paginator->currentPage(),
                'from' => $paginator->firstItem(),
                'lastPage' => $paginator->lastPage(),
                'perPage' => $paginator->perPage(),
                'to' => $paginator->lastItem(),
                'total' => $paginator->total(),
            ],
        ]);
    }

    public function handleDelete(): JsonResponse
    {
        return response()->json(status: HttpStatusCodeEnum::NON_AUTHORITATIVE_INFORMATION->value);
    }
}
