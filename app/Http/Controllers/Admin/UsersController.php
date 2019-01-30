<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\User\ResetPasswordRequest;
use App\Http\Requests\User\UserRequest;
use App\Role;
use App\User;
use Illuminate\Support\Facades\Auth;

class UsersController extends BaseController
{
    public function __construct()
    {
        $this->middleware('inhibitIfAuth')->only(['edit', 'update']);
    }

    public function index()
    {
        $users = User::getModelDataWithPagination(false, ['role'], [(int) Auth::id()]);
        return $this->loadView('users.index', ['users' => $users]);
    }

    public function create()
    {
        $roles = Role::get();
        return $this->loadView('users.create', ['roles' => $roles]);
    }

    public function edit(User $user)
    {
        $roles = Role::get();
        return $this->loadView('users.edit', ['user' => $user, 'roles' => $roles]);
    }

    public function update(UserRequest $request, User $user)
    {
        $request->updateUser($user);
        return back()->with('alert', [
            'type' => 'success',
            'message' => __('messages.item_updated_success')
        ]);
    }

    public function store(UserRequest $request)
    {
        $request->storeUser();
        return redirect(route(getRouteName('users', 'index')))->with('alert', [
            'type' => 'success',
            'message' => __('messages.item_created_success')
        ]);
    }

    public function destroy(User $user)
    {
        if ($user->id === Auth::id()) {
            return back();
        }

        $user->delete();

        return back()->with('alert', [
            'type' => 'success',
            'message' => __('messages.item_deleted_success')
        ]);
    }

    public function resetPassword(ResetPasswordRequest $request, User $user)
    {
        $request->resetPassword($user);
        return back()->with('alert', [
            'type' => 'success',
            'message' => __('passwords.reset')
        ]);
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
