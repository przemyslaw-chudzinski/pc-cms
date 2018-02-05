<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Role;
use App\User;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::getUsersWithPagination();
        return view('admin.material_theme.users.index', ['users' => $users]);
    }

    public function create()
    {
        $roles = Role::getRoles();
        return view('admin.material_theme.users.create', ['roles' => $roles]);
    }

    public function edit(User $user)
    {
        $roles = Role::getRoles();
        return view('admin.material_theme.users.edit', ['user' => $user, 'roles' => $roles]);
    }

    public function update(User $user)
    {
        return $user->updateUser();
    }

    public function store()
    {
        return User::createNewUser();
    }

    public function destroy(User $user)
    {
        return $user->removeUser();
    }

    public function resetPassword(User $user)
    {
        return $user->resetPassword();
    }

    public function updateUserRole(User $user)
    {
        return $user->updateUserRole();
    }
}
