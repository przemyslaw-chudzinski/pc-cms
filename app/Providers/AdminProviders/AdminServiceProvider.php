<?php

namespace App\Providers\AdminProviders;

use App\Core\MassActions;
use App\Core\Menu;
use App\Core\Segment;
use App\Core\Setting;
use App\Role;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AdminServiceProvider extends ServiceProvider
{

    protected $theme = 'material_theme';

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerViews();

        $this->composeViews();
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->register(AdminRouteServiceProvider::class);

        $this->app->bind('segment', function () {
            return new Segment();
        });

        $this->app->bind('setting', function () {
            return new Setting();
        });

        $this->app->bind('admin.mass_actions', function () {
            return new MassActions();
        });

        $this->app->bind('menu', function () {
            return new Menu();
        });

        $this->loadHelpers();
    }

    protected function registerViews()
    {
        $this->loadViewsFrom(base_path('resources/admin-views/' . $this->theme), 'admin');
    }

    protected function loadHelpers()
    {
        foreach (glob(app_path().'/Helpers/*.php') as $filename) {
            require_once $filename;
        }
    }

    protected function composeViews()
    {
        /* Compose current logged user  */
        View::composer([
            'admin::components.widgets.hello-wgt',
            'admin::partials.aside-left',
            'admin::accountSettings.index',
            'admin::components.widgets.last-login-wgt'
        ], function ($view) {
            $view->with('user',  Auth::user());
        });

        /* Compose user roles */
        View::composer([
            'admin::components.forms.changeUserRoleModal'
        ], function ($view) {
            $roles = Role::get();
            $view->with('roles', $roles);
        });

        View::composer([
            'admin::components.widgets.last-registered-users-wgt'
        ], function ($view) {
            $view->with('users', User::getLastRegisteredUsers());
        });
    }
}
