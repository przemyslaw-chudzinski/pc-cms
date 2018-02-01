<?php

Route::group(['prefix' => config('admin.admin_path'), 'namespace' => 'Admin'], function () {
    Route::get('/login', 'AuthController@showLoginForm')->name('admin.show_login_form');
    Route::post('/login', 'AuthController@login')->name('admin.login');
    Route::get('/logout', 'AuthController@logout')->name('admin.logout');
});

Route::group([
    'prefix' => config('admin.admin_path'),
    'namespace' => 'Admin',
    'middleware' => ['auth.admin']
], function () {

    Route::get('/', 'BackendController@index')->name(config('admin.modules.dashboard.actions.index.route_name'));

    /* Segments */
    Route::group(['prefix' => 'segments'], function () {
        Route::get('/', 'SegmentsController@index')->name(config('admin.modules.segments.actions.index.route_name'));
        Route::get('/{segment}/edit', 'SegmentsController@edit')->name(config('admin.modules.segments.actions.edit.route_name'));
        Route::put('{segment}', 'SegmentsController@update')->name(config('admin.modules.segments.actions.update.route_name'));
        Route::delete('{segment}', 'SegmentsController@destroy')->name(config('admin.modules.segments.actions.destroy.route_name'));
        Route::post('/', 'SegmentsController@store')->name(config('admin.modules.segments.actions.store.route_name'));
        Route::get('/create', 'SegmentsController@create')->name(config('admin.modules.segments.actions.create.route_name'));
    });

    /* Pages */
    Route::group(['prefix' => 'pages'], function () {
        Route::get('/', 'PagesController@index')->name(config('admin.modules.pages.actions.index.route_name'));
        Route::get('/{page}/edit', 'PagesController@edit')->name(config('admin.modules.pages.actions.edit.route_name'));
        Route::put('{page}', 'PagesController@update')->name(config('admin.modules.pages.actions.update.route_name'));
        Route::delete('{page}', 'PagesController@destroy')->name(config('admin.modules.pages.actions.destroy.route_name'));
        Route::post('/', 'PagesController@store')->name(config('admin.modules.pages.actions.store.route_name'));
        Route::get('/create', 'PagesController@create')->name(config('admin.modules.pages.actions.create.route_name'));
    });

    /* Projects */
    Route::group(['prefix' => 'projects'], function () {
        Route::get('/', 'ProjectsController@index')->name('admin.projects.index');
        Route::get('/{project}/edit', 'ProjectsController@edit')->name('admin.projects.edit');
        Route::put('{project}', 'ProjectsController@update')->name('admin.projects.update');
        Route::delete('{project}', 'ProjectsController@destroy')->name('admin.projects.destroy');
        Route::post('/', 'ProjectsController@store')->name('admin.projects.store');
        Route::get('/create', 'ProjectsController@create')->name('admin.projects.create');

        /* Projects categories */
        Route::group(['prefix' => 'categories'], function () {
            Route::get('/', 'ProjectCategoriesController@index')->name('admin.projects.categories.index');
            Route::get('/{projectCategory}/edit', 'ProjectCategoriesController@edit')->name('admin.projects.categories.edit');
            Route::put('{projectCategory}', 'ProjectCategoriesController@update')->name('admin.projects.categories.update');
            Route::delete('{projectCategory}', 'ProjectCategoriesController@destroy')->name('admin.projects.categories.destroy');
            Route::post('/', 'ProjectCategoriesController@store')->name('admin.projects.categories.store');
            Route::get('/create', 'ProjectCategoriesController@create')->name('admin.projects.categories.create');
        });
    });

    /* Blog */
    Route::group(['prefix' => 'articles'], function () {
       Route::get('/', 'BlogController@index')->name('admin.articles.index');
       Route::get('/create', 'BlogController@create')->name('admin.articles.create');
       Route::get('{article}/edit', 'BlogController@edit')->name('admin.articles.edit');
       Route::post('/', 'BlogController@store')->name('admin.articles.store');
       Route::put('{article}', 'BlogController@update')->name('admin.articles.update');
       Route::delete('{article}', 'BlogController@destroy')->name('admin.articles.destroy');

        /* Blog Categories */
        Route::group(['prefix' => 'categories'], function () {
            Route::get('/', 'BlogCategoriesController@index')->name('admin.articles.categories.index');
            Route::get('/create', 'BlogCategoriesController@create')->name('admin.articles.categories.create');
            Route::get('{blogCategory}/edit', 'BlogCategoriesController@edit')->name('admin.articles.categories.edit');
            Route::post('/', 'BlogCategoriesController@store')->name('admin.articles.categories.store');
            Route::put('{blogCategory}', 'BlogCategoriesController@update')->name('admin.articles.categories.update');
            Route::delete('{blogCategory}', 'BlogCategoriesController@destroy')->name('admin.articles.categories.destroy');
        });
    });

    /* Settings */
    Route::group(['prefix' => 'settings'], function () {
        Route::get('/', 'SettingsController@index')->name('admin.settings.index');
        Route::post('/', 'SettingsController@store')->name('admin.settings.store');
        Route::put('{setting}', 'SettingsController@update')->name('admin.settings.update');
        Route::delete('{setting}', 'SettingsController@destroy')->name('admin.settings.destroy');
    });

    /* Menus */
    Route::group(['prefix' => 'menus'], function () {
        Route::get('/', 'MenusController@index')->name('admin.menus.index');
        Route::get('/{menu}/edit', 'MenusController@edit')->name('admin.menus.edit');
        Route::get('/{menu}/builder', 'MenusController@menuBuilder')->name('admin.menus.builder');
        Route::put('{menu}', 'MenusController@update')->name('admin.menus.update');
        Route::delete('{menu}', 'MenusController@destroy')->name('admin.menus.destroy');
        Route::post('/', 'MenusController@store')->name('admin.menus.store');
        Route::get('/create', 'MenusController@create')->name('admin.menus.create');

        /* Menu items */
        Route::post('/{menu}/items/create', 'MenuItemsController@store')->name('admin.menus.items.store');
        Route::delete('/items/{menuItem}', 'MenuItemsController@destroy')->name('admin.menus.items.destroy');

    });

    /* Account settings */
    Route::group(['prefix' => 'account-settings'], function () {
        Route::get('/', 'AccountSettingsController@index')->name('admin.account_settings.index');
        Route::put('/', 'AccountSettingsController@update')->name('admin.account_settings.update');
    });

    /* Users */
    Route::group(['prefix' => 'users'], function () {
        Route::get('/', 'UsersController@index')->name('admin.users.index');
        Route::get('/{user}/edit', 'UsersController@edit')->name('admin.users.edit');
        Route::put('{user}/reset-password', 'UsersController@resetPassword')->name(config('admin.modules.users.actions.reset_password.route_name'));
        Route::put('{user}', 'UsersController@update')->name('admin.users.update');
        Route::delete('{user}', 'UsersController@destroy')->name('admin.users.destroy');
        Route::post('/', 'UsersController@store')->name('admin.users.store');
        Route::get('/create', 'UsersController@create')->name('admin.users.create');

        Route::group(['prefix' => 'roles'], function () {
            Route::get('/', 'RolesController@index')->name('admin.users.roles.index');
            Route::post('/', 'RolesController@store')->name('admin.users.roles.store');
            Route::get('create', 'RolesController@create')->name('admin.users.roles.create');
            Route::put('{role}', 'RolesController@update')->name('admin.users.roles.update');
            Route::get('{role}/edit', 'RolesController@edit')->name('admin.users.roles.edit');
            Route::delete('{role}', 'RolesController@destroy')->name('admin.users.roles.destroy');
            Route::get('{role}/set-permissions', 'RolesController@setPermissions')->name('admin.users.roles.setPermissions');
            Route::put('{role}/update-permissions', 'RolesController@updatePermissions')->name('admin.users.roles.updatePermissions');

        });
    });

});