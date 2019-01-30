<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class InhibitIfAuthenticated
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
        $currentUserId = $request->route('user')->id;
        $loggedUserId = Auth::id();
        return $loggedUserId !== null && $loggedUserId !== $currentUserId ? $next($request) : redirect()->back();
    }
}
