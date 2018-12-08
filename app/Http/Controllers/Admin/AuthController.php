<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;

class AuthController extends BaseController
{

    use AuthenticatesUsers;

    protected $redirectTo;

    public function __construct()
    {
        $this->redirectTo = config('admin.admin_path');
    }

    public function showLoginForm()
    {
        if (Auth::user()) {
            return redirect(route(config('admin.modules.dashboard.actions.index.route_name')));
        }
        return $this->loadView('auth.login');
    }

    public function logout()
    {
        Auth::logout();
        return redirect(route('admin.login'));
    }

    protected function authenticated(Request $request, $user)
    {
        $user->updateUserAfterLogin();

        return redirect(route(getRouteName('dashboard', 'index')))
                ->with('alert', [
                    'type' => 'success',
                    'message' => 'You have been logged successfully'
                ]);
    }
}
