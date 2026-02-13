<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class SanitizeLogData
{
    /**
     * Sensitive fields that should never be logged.
     */
    protected array $sensitiveFields = [
        'password',
        'password_confirmation',
        'current_password',
        'new_password',
        'token',
        'api_key',
        'secret',
        'credit_card',
        'card_number',
        'cvv',
        'ssn',
        'authorization',
    ];

    /**
     * Handle an incoming request.
     * Sanitizes request data before it gets logged anywhere.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Store sanitized input for any logging purposes
        $request->attributes->set('sanitized_input', $this->sanitizeData($request->all()));
        
        return $next($request);
    }

    /**
     * Recursively sanitize sensitive data from arrays.
     */
    protected function sanitizeData(array $data): array
    {
        foreach ($data as $key => $value) {
            $lowercaseKey = strtolower($key);
            
            // Check if key contains any sensitive field name
            foreach ($this->sensitiveFields as $sensitiveField) {
                if (str_contains($lowercaseKey, $sensitiveField)) {
                    $data[$key] = '[REDACTED]';
                    break;
                }
            }
            
            // Recursively sanitize nested arrays
            if (is_array($value)) {
                $data[$key] = $this->sanitizeData($value);
            }
        }
        
        return $data;
    }
}
