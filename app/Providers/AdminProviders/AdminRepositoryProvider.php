<?php

namespace App\Providers\AdminProviders;

use App\Core\Contracts\Repositories\ProjectRepository;
use App\Core\EloquentRepositories\EloquentProject;
use Illuminate\Support\ServiceProvider;

class AdminRepositoryProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(ProjectRepository::class, EloquentProject::class);
    }
}
