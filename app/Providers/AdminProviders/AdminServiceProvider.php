<?php

namespace App\Providers\AdminProviders;

use App\Core\Blog\Blog;
use App\Core\MassActions\MassActions;
use App\Core\Segments\Segments;
use App\Core\Services\ThemeService;
use App\Core\Theme\Theme;
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

        $this->app->bind('admin.segments', function () {
            return new Segments();
        });

//        $this->app->bind('admin.blog', function () {
//            return new Blog();
//        });

        $this->app->bind('admin.theme', function () {
            return new Theme();
        });

        $this->app->bind('admin.mass_actions', function () {
            return new MassActions();
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

        View::composer([
            'admin::pages.create',
            'admin::pages.edit',
        ], function ($view) {
            $pageTemplates = ThemeService::getPageTemplates();
            $view->with('pageTemplates', $pageTemplates);
        });
    }
}
