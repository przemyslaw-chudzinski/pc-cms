<?php

namespace App\Providers\AdminProviders;

use App\Core\Contracts\Services\FilesService;
use App\Core\FilesService\FilesService as FilesServiceCore;
use App\Core\MassActions;
use App\Core\Menu;
use App\Core\Modules\Blog;
use App\Core\Modules\BlogCategory;
use App\Core\Modules\ProjectCategory;
use App\Core\Modules\Project;
use App\Core\Modules\Role;
use App\Core\Modules\Segment;
use App\Core\Modules\Setting;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use App\Core\Modules\User as UserModule;
use App\Role as RoleModel;

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
        $this->app->register(AdminRepositoryServiceProvider::class);

        $this->app->bind(FilesService::class, FilesServiceCore::class);

        $this->app->bind('admin.segment', function () {
            return new Segment('segments');
        });

        $this->app->bind('admin.setting', function () {
            return new Setting('settings');
        });

        $this->app->bind('admin.mass_actions', function () {
            return new MassActions();
        });

        $this->app->bind('menu', function () {
            return new Menu();
        });

        $this->app->bind('admin.project', function () {
            return new Project('projects');
        });

        $this->app->bind('admin.project_categories', function () {
            return new ProjectCategory('project_categories');
        });

        $this->app->bind('admin.user', function () {
            return new UserModule('users');
        });

        $this->app->bind('admin.role', function () {
            return new Role('roles');
        });

        $this->app->bind('admin.blog', function () {
            return new Blog('blog');
        });

        $this->app->bind('admin.blog_category', function () {
            return new BlogCategory('blog_categories');
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
            $roles = RoleModel::get();
            $view->with('roles', $roles);
        });

        View::composer([
            'admin::components.widgets.last-registered-users-wgt'
        ], function ($view) {
            $view->with('users', User::getLastRegisteredUsers());
        });
    }
}
