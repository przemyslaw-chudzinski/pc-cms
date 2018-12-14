<?php

namespace App\Http\Middleware;

use Closure;

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
//        $maintenanceMode = Theme::getSetting('maintenance_mode');

        $maintenanceMode = false;

        if ($maintenanceMode) {
            return redirect(url('/maintenance'));
        }
        return $next($request);
    }
}
