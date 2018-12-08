<?php

namespace App\Providers;

use App\Core\Blog\Blog;
use App\Core\Theme\Theme;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use App\Core\Segments\Segments;
use App\Core\MassActions\MassActions;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('admin.segments', function () {
            return new Segments();
        });

        $this->app->bind('admin.blog', function () {
            return new Blog();
        });

        $this->app->bind('admin.theme', function () {
           return new Theme();
        });

        $this->app->bind('admin.mass_actions', function () {
           return new MassActions();
        });

        $this->loadHelpers();
    }

    protected function loadHelpers()
    {
        foreach (glob(app_path().'/Helpers/*.php') as $filename) {
            require_once $filename;
        }
    }
}
