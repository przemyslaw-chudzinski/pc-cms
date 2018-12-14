<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Role\PermissionRequest;
use App\Http\Requests\Role\RoleRequest;
use App\Role;

class RolesController extends BaseController
{
    public function index()
    {
        $roles = Role::getModelDataWithPagination();
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

    public function store(RoleRequest $request)
    {
        $request->storeRole();
        return redirect(route(getRouteName('roles', 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Role has been created successfully'
        ]);
    }

    public function update(RoleRequest $request, Role $role)
    {
        $request->updateRole($role);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Role has been updated successfully'
        ]);
    }

    public function updatePermissions(PermissionRequest $request, Role $role)
    {
        $request->updatePermissions($role);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Permissions has been saved'
        ]);
    }

    public function destroy(Role $role)
    {
        if ($role->allow_remove) {
            $role->delete();
            return back()->with('alert', [
                'type' => 'success',
                'message' => 'Role has been deleted successfully'
            ]);
        }
        return back();
    }

    public function massActions()
    {
        return Role::massActions();
    }
}
