<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Auth;

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
        ], function ($view) {
            $authUser = Auth::user();
            $view->with('user', $authUser);
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
