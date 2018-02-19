<?php

Route::group(['prefix' => config('admin.admin_path'), 'namespace' => 'Admin'], function () {
    Route::get('/login', 'AuthController@showLoginForm')->name('admin.show_login_form');
    Route::post('/login', 'AuthController@login')->name('admin.login');
    Route::get('/logout', 'AuthController@logout')->name('admin.logout');
});

/* Account settings */
Route::group(['prefix' => 'account-settings', 'namespace' => 'Admin', 'middleware' => ['web']], function () {
    Route::get('/', 'AccountSettingsController@index')->name('admin.account_settings.index');
    Route::put('/', 'AccountSettingsController@update')->name('admin.account_settings.update');
});

Route::group([
    'prefix' => config('admin.admin_path'),
    'namespace' => 'Admin',
    'middleware' => ['auth.admin']
], function () {

    Route::get('/', 'BackendController@index')->name(getRouteName('dashboard', 'index'));

    /* Segments */
    Route::group(['prefix' => 'segments'], function () {
        Route::get('/', 'SegmentsController@index')->name(getRouteName('segments', 'index'));
        Route::get('/{segment}/edit', 'SegmentsController@edit')->name(getRouteName('segments', 'edit'));
        Route::put('{segment}', 'SegmentsController@update')->name(getRouteName('segments', 'update'));
        Route::delete('{segment}', 'SegmentsController@destroy')->name(getRouteName('segments', 'destroy'));
        Route::post('/', 'SegmentsController@store')->name(getRouteName('segments', 'store'));
        Route::get('/create', 'SegmentsController@create')->name(getRouteName('segments', 'create'));
    });

    /* Pages */
    Route::group(['prefix' => 'pages'], function () {
        Route::get('/', 'PagesController@index')->name(getRouteName('pages', 'index'));
        Route::get('/{page}/edit', 'PagesController@edit')->name(getRouteName('pages', 'edit'));
        Route::put('{page}', 'PagesController@update')->name(getRouteName('pages', 'update'));
        Route::delete('{page}', 'PagesController@destroy')->name(getRouteName('pages', 'destroy'));
        Route::post('/', 'PagesController@store')->name(getRouteName('pages', 'store'));
        Route::get('/create', 'PagesController@create')->name(getRouteName('pages', 'create'));
    });

    /* Projects */
    Route::group(['prefix' => 'projects'], function () {
        Route::get('/', 'ProjectsController@index')->name(getRouteName('projects', 'index'));
        Route::get('/{project}/edit', 'ProjectsController@edit')->name(getRouteName('projects', 'edit'));
        Route::put('{project}', 'ProjectsController@update')->name(getRouteName('projects', 'update'));
        Route::delete('{project}', 'ProjectsController@destroy')->name(getRouteName('projects', 'destroy'));
        Route::post('/', 'ProjectsController@store')->name(getRouteName('projects', 'store'));
        Route::get('/create', 'ProjectsController@create')->name(getRouteName('projects', 'create'));
        Route::get('{project}/images', 'ProjectsController@images')->name(getRouteName('projects', 'images'));
        Route::put('{project}/images/add', 'ProjectsController@addImage')->name(getRouteName('projects', 'images_add'));
        Route::put('{project}/images', 'ProjectsController@removeImage')->name(getRouteName('projects', 'images_destroy'));

        /* Projects categories */
        Route::group(['prefix' => 'categories'], function () {
            Route::get('/', 'ProjectCategoriesController@index')->name(getRouteName('project_categories', 'index'));
            Route::get('/{projectCategory}/edit', 'ProjectCategoriesController@edit')->name(getRouteName('project_categories', 'edit'));
            Route::put('{projectCategory}', 'ProjectCategoriesController@update')->name(getRouteName('project_categories', 'update'));
            Route::delete('{projectCategory}', 'ProjectCategoriesController@destroy')->name(getRouteName('project_categories', 'destroy'));
            Route::post('/', 'ProjectCategoriesController@store')->name(getRouteName('project_categories', 'store'));
            Route::get('/create', 'ProjectCategoriesController@create')->name(getRouteName('project_categories', 'create'));
        });
    });

    /* Blog */
    Route::group(['prefix' => 'articles'], function () {
       Route::get('/', 'BlogController@index')->name(getRouteName('blog', 'index'));
       Route::get('/create', 'BlogController@create')->name(getRouteName('blog', 'create'));
       Route::get('{article}/edit', 'BlogController@edit')->name(getRouteName('blog', 'edit'));
       Route::post('/', 'BlogController@store')->name(getRouteName('blog', 'store'));
       Route::put('{article}', 'BlogController@update')->name(getRouteName('blog', 'update'));
       Route::delete('{article}', 'BlogController@destroy')->name(getRouteName('blog', 'destroy'));

        /* Blog Categories */
        Route::group(['prefix' => 'categories'], function () {
            Route::get('/', 'BlogCategoriesController@index')->name(getRouteName('blog_categories', 'index'));
            Route::get('/create', 'BlogCategoriesController@create')->name(getRouteName('blog_categories', 'create'));
            Route::get('{blogCategory}/edit', 'BlogCategoriesController@edit')->name(getRouteName('blog_categories', 'edit'));
            Route::post('/', 'BlogCategoriesController@store')->name(getRouteName('blog_categories', 'store'));
            Route::put('{blogCategory}', 'BlogCategoriesController@update')->name(getRouteName('blog_categories', 'update'));
            Route::delete('{blogCategory}', 'BlogCategoriesController@destroy')->name(getRouteName('blog_categories', 'destroy'));
        });
    });

    /* Settings */
    Route::group(['prefix' => 'settings'], function () {
        Route::get('/', 'SettingsController@index')->name(getRouteName('settings', 'index'));
        Route::post('/', 'SettingsController@store')->name(getRouteName('settings', 'store'));
        Route::put('{setting}', 'SettingsController@update')->name(getRouteName('settings', 'update'));
        Route::delete('{setting}', 'SettingsController@destroy')->name(getRouteName('settings', 'destroy'));
    });

    /* Menus */
    Route::group(['prefix' => 'menus'], function () {
        Route::get('/', 'MenusController@index')->name(getRouteName('menus', 'index'));
        Route::get('/{menu}/edit', 'MenusController@edit')->name(getRouteName('menus', 'edit'));
        Route::get('/{menu}/builder', 'MenusController@menuBuilder')->name(getRouteName('menus', 'builder'));
        Route::put('{menu}', 'MenusController@update')->name(getRouteName('menus', 'update'));
        Route::delete('{menu}', 'MenusController@destroy')->name(getRouteName('menus', 'destroy'));
        Route::post('/', 'MenusController@store')->name(getRouteName('menus', 'store'));
        Route::get('/create', 'MenusController@create')->name(getRouteName('menus', 'create'));

        /* Menu items */
        Route::post('/{menu}/items/create', 'MenuItemsController@store')->name(getRouteName('menus', 'item_store'));
        Route::delete('/items/{menuItem}', 'MenuItemsController@destroy')->name(getRouteName('menus', 'item_destroy'));
        Route::put('/items/{menuItem}', 'MenuItemsController@update')->name(getRouteName('menus', 'item_update'));

    });

    /* Users */
    Route::group(['prefix' => 'users'], function () {
        Route::get('/', 'UsersController@index')->name(getRouteName('users', 'index'));
        Route::get('/{user}/edit', 'UsersController@edit')->name(getRouteName('users', 'edit'));
        Route::put('{user}/reset-password', 'UsersController@resetPassword')->name(getRouteName('users', 'reset_password'));
        Route::put('{user}', 'UsersController@update')->name(getRouteName('users', 'update'));
        Route::put('{user}/role-update', 'UsersController@updateUserRole')->name(getRouteName('users', 'role_update'));
        Route::delete('{user}', 'UsersController@destroy')->name(getRouteName('users', 'destroy'));
        Route::post('/', 'UsersController@store')->name(getRouteName('users', 'store'));
        Route::get('/create', 'UsersController@create')->name(getRouteName('users', 'create'));

        /* Roles */
        Route::group(['prefix' => 'roles'], function () {
            Route::get('/', 'RolesController@index')->name(getRouteName('roles','index'));
            Route::post('/', 'RolesController@store')->name(getRouteName('roles', 'store'));
            Route::get('create', 'RolesController@create')->name(getRouteName('roles', 'create'));
            Route::put('{role}', 'RolesController@update')->name(getRouteName('roles', 'update'));
            Route::get('{role}/edit', 'RolesController@edit')->name(getRouteName('roles', 'edit'));
            Route::delete('{role}', 'RolesController@destroy')->name(getRouteName('roles', 'destroy'));
            Route::get('{role}/set-permissions', 'RolesController@setPermissions')->name(getRouteName('roles', 'permission_set_permission'));
            Route::put('{role}/update-permissions', 'RolesController@updatePermissions')->name(getRouteName('roles', 'permission_update_permission'));

        });
    });

    /* Themes */
    Route::group(['prefix' => 'themes'], function () {
       Route::get('/', 'ThemesController@index')->name(getRouteName('themes', 'index'));
       Route::put('/', 'ThemesController@update')->name(getRouteName('themes', 'update'));
    });

});