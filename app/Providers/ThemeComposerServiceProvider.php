<?php

namespace App\Providers;

use App\BlogCategory;
use App\Project;
use Illuminate\Support\ServiceProvider;
use View;
use App\Article;
use App\Facades\Theme;

class ThemeComposerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {

        $theme = Theme::getSetting('theme');

        View::composer([
            'themes.' . $theme . '.components.blog'
        ], function ($view) {
            $articles = Article::where('published', true)->latest()->limit(4)->get();
            $view->with('articles', $articles);
        });

        View::composer([
            'themes.' . $theme . '.page-templates.blog'
        ], function ($view) {
            $articles = Article::where('published', true)->latest()->paginate(10);
            $view->with('articles', $articles);
        });

        View::composer([
            'themes.' . $theme . '.page-templates.projects'
        ], function ($view) {
            $projects = Project::where('published', true)->latest()->paginate(10);
            $view->with('projects', $projects);
        });

        View::composer([
            'themes.' . $theme . '.components.blog-categories-list'
        ], function ($view) {
            $categories = BlogCategory::where('published', true)->get();
            $view->with('categories', $categories);
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
