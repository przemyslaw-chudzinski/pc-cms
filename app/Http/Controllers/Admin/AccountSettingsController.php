<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Role;
use App\User;

class AccountSettingsController extends Controller
{
    public function index()
    {
        $roles = Role::getRoles();
        return view('admin::accountSettings.index', ['roles' => $roles]);
    }

    public function update()
    {
        return User::updateLoggedUserSettings();
    }
}
