<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class AuthController extends Controller
{

    protected $redirectTo;

    use AuthenticatesUsers;

    public function __construct()
    {
        $this->redirectTo = config('admin.admin_path');
    }

    public function showLoginForm()
    {
        return view('admin.auth.login');
    }
}
