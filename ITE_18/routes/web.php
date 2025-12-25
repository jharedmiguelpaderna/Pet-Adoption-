<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Frontend SPA Route
|--------------------------------------------------------------------------
|
| Serve the compiled frontend (located in public/frontend) for any request
| that is not handled by the API. This allows React/Vite routing to work
| while keeping API routes under /api managed separately.
|
*/
Route::view('/{any?}', 'frontend')
    ->where('any', '^(?!api).*$');
