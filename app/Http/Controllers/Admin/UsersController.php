<?php

namespace App\Http\Controllers\Admin;

use App\Role;
use App\User;

class UsersController extends BaseController
{
    public function index()
    {
        $users = User::getUsersWithPagination();
        return $this->loadView('users.index', ['users' => $users]);
    }

    public function create()
    {
        $roles = Role::getRoles();
        return $this->loadView('users.create', ['roles' => $roles]);
    }

    public function edit(User $user)
    {
        $roles = Role::getRoles();
        return $this->loadView('users.edit', ['user' => $user, 'roles' => $roles]);
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

    public function massActions()
    {
        return User::massActions();
    }
}
