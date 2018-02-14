<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use View;
use App\Article;

class ThemeComposerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {

        View::composer([
            'themes.PortfolioTheme.components.blog'
        ], function ($view) {
            $articles = Article::where('published', true)->latest()->limit(4)->get();
            $view->with('articles', $articles);
        });

        View::composer([
            'themes.PortfolioTheme.page-templates.blog'
        ], function ($view) {
            $articles = Article::where('published', true)->latest()->paginate(10);
            $view->with('articles', $articles);
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
