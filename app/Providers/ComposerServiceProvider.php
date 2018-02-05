<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Auth;
use App\Role;

class ComposerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        /* Compose current logged user  */
        View::composer([
            'admin.material_theme.components.widgets.hello-wgt',
            'admin.material_theme.partials.aside-left',
            'admin.material_theme.accountSettings.index',
            'admin.material_theme.components.widgets.last-login-wgt'
        ], function ($view) {
            $authUser = Auth::user();
            $view->with('user', $authUser);
        });

        /* Compose user roles */
        View::composer([
            'admin.material_theme.components.forms.changeUserRoleModal'
        ], function ($view) {
            $roles = Role::getRoles();
            $view->with('roles', $roles);
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
