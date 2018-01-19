<?php

namespace App\Providers;

use App\Core\Blog\Blog;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use App\Core\Segments\Segments;

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
    }
}
