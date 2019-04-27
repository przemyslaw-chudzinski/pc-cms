<?php

namespace App\Providers\AdminProviders;

use App\Core\Contracts\Repositories\BlogCategoryRepository;
use App\Core\Contracts\Repositories\BlogRepository;
use App\Core\Contracts\Repositories\ProjectCategoryRepository;
use App\Core\Contracts\Repositories\ProjectRepository;
use App\Core\Contracts\Repositories\RoleRepository;
use App\Core\Contracts\Repositories\SegmentRepository;
use App\Core\Contracts\Repositories\UserRepository;
use App\Core\EloquentRepositories\EloquentBlog;
use App\Core\EloquentRepositories\EloquentBlogCategory;
use App\Core\EloquentRepositories\EloquentProject;
use App\Core\EloquentRepositories\EloquentProjectCategory;
use App\Core\EloquentRepositories\EloquentRole;
use App\Core\EloquentRepositories\EloquentSegment;
use App\Core\EloquentRepositories\EloquentUser;
use Illuminate\Support\ServiceProvider;

class AdminRepositoryServiceProvider extends ServiceProvider
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
        $this->app->singleton(ProjectCategoryRepository::class, EloquentProjectCategory::class);
        $this->app->singleton(SegmentRepository::class, EloquentSegment::class);
        $this->app->singleton(UserRepository::class, EloquentUser::class);
        $this->app->singleton(RoleRepository::class, EloquentRole::class);
        $this->app->singleton(BlogRepository::class, EloquentBlog::class);
        $this->app->singleton(BlogCategoryRepository::class, EloquentBlogCategory::class);
    }
}
