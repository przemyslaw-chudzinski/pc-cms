<?php

namespace App\Http\Controllers\Admin;

use App\Core\Contracts\Repositories\UserRepository;
use App\Http\Requests\User\ResetPasswordRequest;
use App\Http\Requests\User\UserRequest;
use App\Role;
use App\User;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class UsersController extends BaseController
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->middleware('inhibitIfAuth')->only(['edit', 'update']);
    }

    /**
     * @return Factory|View
     */
    public function index()
    {
        $users = $this->userRepository->list(10, ['role'], [(int) Auth::id()]);
        return $this->loadView('users.index', ['users' => $users]);
    }

    /**
     * @return Factory|View
     */
    public function create()
    {
        $roles = Role::get();
        return $this->loadView('users.create', ['roles' => $roles]);
    }

    /**
     * @param User $user
     * @return Factory|View
     */
    public function edit(User $user)
    {
        $roles = Role::get();
        return $this->loadView('users.edit', ['user' => $user, 'roles' => $roles]);
    }

    /**
     * @param UserRequest $request
     * @param User $user
     * @return RedirectResponse
     */
    public function update(UserRequest $request, User $user)
    {
        $request->updateUser($user);
        return back()->with('alert', [
            'type' => 'success',
            'message' => __('messages.item_updated_success')
        ]);
    }

    /**
     * @param UserRequest $request
     * @return RedirectResponse
     */
    public function store(UserRequest $request)
    {
        $request->storeUser();
        return redirect(route(getRouteName('users', 'index')))->with('alert', [
            'type' => 'success',
            'message' => __('messages.item_created_success')
        ]);
    }

    /**
     * @param User $user
     * @return RedirectResponse
     * @throws \Exception
     */
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

    /**
     * @param ResetPasswordRequest $request
     * @param User $user
     * @return RedirectResponse
     */
    public function resetPassword(ResetPasswordRequest $request, User $user)
    {
        $request->resetPassword($user);
        return back()->with('alert', [
            'type' => 'success',
            'message' => __('passwords.reset')
        ]);
    }

    /**
     * @param User $user
     * @return RedirectResponse
     */
    public function updateUserRole(User $user)
    {
        return $user->updateUserRole();
    }

    /**
     * @return RedirectResponse
     */
    public function massActions()
    {
        return User::massActions();
    }
}
