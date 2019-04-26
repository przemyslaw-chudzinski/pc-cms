<?php

namespace App\Http\Controllers\Admin;

use App\Core\Contracts\Repositories\RoleRepository;
use App\Http\Requests\Role\PermissionRequest;
use App\Http\Requests\Role\RoleRequest;
use App\Role;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use App\Facades\Role as RoleFasade;

class RolesController extends BaseController
{
    /**
     * @var RoleRepository
     */
    private $roleRepository;

    public function __construct(RoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    /**
     * @return Factory|View
     */
    public function index()
    {
        $roles = $this->roleRepository->list();
        return $this->loadView('roles.index', ['roles' => $roles]);
    }

    /**
     * @return Factory|View
     */
    public function create()
    {
        return $this->loadView('roles.create');
    }

    /**
     * @param Role $role
     * @return Factory|View
     */
    public function edit(Role $role)
    {
        return $this->loadView('roles.edit', ['role' => $role]);
    }

    /**
     * @param Role $role
     * @return Factory|View
     */
    public function setPermissions(Role $role)
    {
        return $this->loadView('roles.setPermissions', ['role' => $role]);
    }

    /**
     * @param RoleRequest $request
     * @return RedirectResponse
     */
    public function store(RoleRequest $request)
    {
        $this->roleRepository->create($request->getPayload(), Auth::id());

        return redirect(route(getRouteName(RoleFasade::getModuleName(), 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Role has been created successfully'
        ]);
    }

    /**
     * @param RoleRequest $request
     * @param Role $role
     * @return RedirectResponse
     */
    public function update(RoleRequest $request, Role $role)
    {
        $this->roleRepository->update($role, $request->getPayload());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Role has been updated successfully'
        ]);
    }

    /**
     * @param PermissionRequest $request
     * @param Role $role
     * @return RedirectResponse
     */
    public function updatePermissions(PermissionRequest $request, Role $role)
    {
        $this->roleRepository->updatePermissions($role, $request->getPayload());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Permissions has been saved'
        ]);
    }

    /**
     * @param Role $role
     * @return RedirectResponse
     */
    public function destroy(Role $role)
    {
        if ($role->allow_remove) {
            $this->roleRepository->delete($role);
            return back()->with('alert', [
                'type' => 'success',
                'message' => 'Role has been deleted successfully'
            ]);
        }
        return back();
    }

    /**
     * @return RedirectResponse
     */
    public function massActions()
    {
        return Role::massActions();
    }
}
