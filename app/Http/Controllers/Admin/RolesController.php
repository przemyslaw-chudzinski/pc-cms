<?php

namespace App\Http\Controllers\Admin;

use App\Role;

class RolesController extends BaseController
{
    public function index()
    {
        $roles = Role::getRolesWithPagination();
        return $this->loadView('roles.index', ['roles' => $roles]);
    }

    public function create()
    {
        return $this->loadView('roles.create');
    }

    public function edit(Role $role)
    {
        return $this->loadView('roles.edit', ['role' => $role]);
    }

    public function setPermissions(Role $role)
    {
        return $this->loadView('roles.setPermissions', ['role' => $role]);
    }

    public function store()
    {
        return Role::createNewRole();
    }

    public function update(Role $role)
    {
        return $role->updateRole();
    }

    public function updatePermissions(Role $role)
    {
        return $role->updatePermissions();
    }

    public function destroy(Role $role)
    {
        return $role->removeRole();
    }

    public function massActions()
    {
        return Role::massActions();
    }
}
