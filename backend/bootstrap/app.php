<?php
use Illuminate\Http\Middleware\HandleCors; // <-- ADD THIS AT THE TOP
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
        $middleware->append(HandleCors::class); // <-- ADD THIS LINE
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
