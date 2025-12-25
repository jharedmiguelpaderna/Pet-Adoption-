<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SanitizeInput
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Sanitize string inputs
        $input = $request->all();
        
        foreach ($input as $key => $value) {
            if (is_string($value)) {
                // Remove potentially dangerous characters
                $input[$key] = strip_tags($value);
                $input[$key] = htmlspecialchars($input[$key], ENT_QUOTES, 'UTF-8');
                
                // Trim whitespace
                $input[$key] = trim($input[$key]);
            }
        }
        
        // Replace the request input with sanitized data
        $request->replace($input);
        
        return $next($request);
    }
}
