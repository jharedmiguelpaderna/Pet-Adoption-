<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Note: EnsureFrontendRequestsAreStateful is removed for API routes
        // API routes use stateless token authentication (no CSRF required)
        // Only use EnsureFrontendRequestsAreStateful for same-domain SPA authentication
        
        // Rate limiting for API routes (commented out for now)
        // $middleware->throttleApi('api', 60, 1);
        
        // Register custom middleware
        $middleware->alias([
            'sanitize' => \App\Http\Middleware\SanitizeInput::class,
            'user.type' => \App\Http\Middleware\CheckUserType::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Handle authentication exceptions for API routes
        $exceptions->render(function (\Illuminate\Auth\AuthenticationException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Unauthenticated.'
                ], 401);
            }
        });
        
        // Handle route not found exceptions for API routes
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Route not found.',
                    'path' => $request->path()
                ], 404);
            }
        });
    })->create();
