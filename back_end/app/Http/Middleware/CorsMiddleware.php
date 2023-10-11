<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{

    public function handle($request, Closure $next)
    {

        // $response = $next($request);
        // $response->header('Access-Control-Allow-Origin', 'http://localhost:3000');
        // $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // $response->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');

         $response = $next($request);
         $response->headers->set('Access-Control-Allow-Origin', '*');
         $response->headers->set('Access-Control-Allow-Methods', 'POST, GET');
         $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Application', 'ip');
        return $response;
    }
}
