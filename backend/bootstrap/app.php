<?php

use App\Exceptions\BusinessLogicException;
use App\Exceptions\NotFoundException;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\UnauthorizedException;
use Laravel\Sanctum\Http\Middleware\CheckAbilities;
use Laravel\Sanctum\Http\Middleware\CheckForAnyAbility;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->statefulApi();
        $middleware->alias([
            'abilities' => CheckAbilities::class,
            'ability' => CheckForAnyAbility::class,
            'disable-cors' => CorsMiddleware::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->renderable(function (UnauthorizedException $e) {
            return response()->json([
                'errors' => [
                    [
                        'detail' => $e->getMessage(),
                    ],
                ],
            ], 401);
        });

        $exceptions->renderable(function (BusinessLogicException $e) {
            return response()->json([
                'errors' => [
                    [
                        'detail' => $e->getMessage(),
                    ],
                ],
            ], 400);
        });

        $exceptions->renderable(function (NotFoundException $e) {
            return response()->json([
                'errors' => [
                    [
                        'detail' => $e->getMessage(),
                    ],
                ],
            ], 404);
        });
    })->create();
