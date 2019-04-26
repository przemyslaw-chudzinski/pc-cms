<?php

namespace App\Http\Controllers\Admin;

use App\Core\Contracts\Repositories\RoleRepository;
use App\User;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class AccountSettingsController extends BaseController
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
        $roles = $this->roleRepository->all();
        return $this->loadView('accountSettings.index', ['roles' => $roles]);
    }

    /**
     * @return RedirectResponse
     */
    public function update()
    {
        User::updateLoggedUserSettings();

        return back()->with('alert', [
            'type' => 'success',
            'message' => __('messages.item_updated_success')
        ]);
    }
}
