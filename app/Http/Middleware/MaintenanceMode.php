<?php

namespace App\Http\Middleware;

use Closure;
use App\Facades\Theme;

class MaintenanceMode
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $maintenanceMode = Theme::getSetting('maintenance_mode');

        if ($maintenanceMode) {
            return 'maintenance mode';
        }
        return $next($request);
    }
}
