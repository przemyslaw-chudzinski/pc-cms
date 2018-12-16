<?php

namespace App\Http\Controllers\Admin;

use App\Role;
use App\User;

class AccountSettingsController extends BaseController
{
    public function index()
    {
        $roles = Role::get();
        return $this->loadView('accountSettings.index', ['roles' => $roles]);
    }

    public function update()
    {
        User::updateLoggedUserSettings();
        return back()->with('alert', [
            'type' => 'success',
            'message' => __('messages.item_updated_success')
        ]);
    }
}
