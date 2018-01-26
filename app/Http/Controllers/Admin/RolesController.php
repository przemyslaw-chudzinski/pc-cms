<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Role;

class RolesController extends Controller
{
    public function index()
    {
        $roles = Role::getRolesWithPagination();
        return view('admin.roles.index', ['roles' => $roles]);
    }

    public function create()
    {
        return view('admin.roles.create');
    }

    public function edit(Role $role)
    {
        return view('admin.roles.edit', ['role' => $role]);
    }

    public function store()
    {
        return Role::createNewRole();
    }

    public function update(Role $role)
    {
        return $role->updateRole();
    }

    public function destroy(Role $role)
    {
        return 'delete';
    }
}
