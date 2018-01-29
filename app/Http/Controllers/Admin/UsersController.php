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
        return view('admin.users.index', ['users' => $users]);
    }

    public function create()
    {
        $roles = Role::getRoles();
        return view('admin.users.create', ['roles' => $roles]);
    }

    public function edit(User $user)
    {
        $roles = Role::getRoles();
        return view('admin.users.edit', ['user' => $user, 'roles' => $roles]);
    }

    public function update(User $user)
    {
        return $user->updateUser();
    }

    public function store()
    {
        return User::createNewUser();
    }
}
