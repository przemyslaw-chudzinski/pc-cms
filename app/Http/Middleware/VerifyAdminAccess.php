<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Route;

class VerifyAdminAccess
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
        if (Auth::user()) {
            $permissions = json_decode(Auth::user()->role->permissions, true);
            $routeName = Route::currentRouteName();
            foreach ($permissions as $module_name => $permission) {
                foreach ($permission['permissions'] as $action) {
                    if ($action['route'] === $routeName) {
                        if ($action['allow']) {
                            return $next($request);
                        } else {
                            return redirect(route(config('admin.modules.dashboard.actions.index.route_name')))->with('alert', [
                                'type' => 'warning',
                                'message' => 'You haven\'t permissions to this source'
                            ]);
                        }
                    }
                }
            }
        }
        return redirect(route('admin.login'));
    }
}
