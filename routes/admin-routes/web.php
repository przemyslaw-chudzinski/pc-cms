<?php

/* Backend login routes */
Route::get('/login', 'AuthController@showLoginForm')->name('admin.show_login_form');
Route::post('/login', 'AuthController@login')->name('admin.login');
Route::get('/logout', 'AuthController@logout')->name('admin.logout');

/* Account settings */
Route::group(['prefix' => 'account-settings'], function () {
    Route::get('/', 'AccountSettingsController@index')->name('admin.account_settings.index');
    Route::put('/', 'AccountSettingsController@update')->name('admin.account_settings.update');
});

Route::group([
    'middleware' => ['auth.admin']
], function () {

    /* Dashboard routes */
    Route::get('/', 'BackendController@index')->name(getRouteName('dashboard', 'index'));

    /* Segments */
    Route::group(['prefix' => 'segments'], function () {
        $module_name = 'segments';
        Route::get('/', 'SegmentsController@index')->name(getRouteName($module_name, 'index'));
        Route::get('/{segment}/edit', 'SegmentsController@edit')->name(getRouteName($module_name, 'edit'));
        Route::put('{segment}', 'SegmentsController@update')->name(getRouteName($module_name, 'update'));
        Route::delete('{segment}', 'SegmentsController@destroy')->name(getRouteName($module_name, 'destroy'));
        Route::post('/', 'SegmentsController@store')->name(getRouteName($module_name, 'store'));
        Route::get('/create', 'SegmentsController@create')->name(getRouteName('segments', 'create'));
        Route::post('/mass-actions', 'SegmentsController@massActions')->name(getRouteName($module_name, 'mass_actions'));
    });

    /* Pages */
    Route::group(['prefix' => 'pages'], function () {
        $module_name = 'pages';
        Route::get('/', 'PagesController@index')->name(getRouteName($module_name, 'index'));
        Route::get('{page}/edit', 'PagesController@edit')->name(getRouteName($module_name, 'edit'));
        Route::put('{page}', 'PagesController@update')->name(getRouteName($module_name, 'update'));
        Route::delete('{page}', 'PagesController@destroy')->name(getRouteName($module_name, 'destroy'));
        Route::post('/', 'PagesController@store')->name(getRouteName($module_name, 'store'));
        Route::get('create', 'PagesController@create')->name(getRouteName($module_name, 'create'));
        Route::post('mass-actions', 'PagesController@massActions')->name(getRouteName($module_name, 'mass_actions'));
    });

    /* Blog */
    Route::group(['prefix' => 'articles'], function () {
        $module_name = 'blog';
        Route::get('/', 'BlogController@index')->name(getRouteName($module_name, 'index'));
        Route::get('/create', 'BlogController@create')->name(getRouteName($module_name, 'create'));
        Route::get('{article}/edit', 'BlogController@edit')->name(getRouteName($module_name, 'edit'));
        Route::post('/', 'BlogController@store')->name(getRouteName($module_name, 'store'));
        Route::put('{article}', 'BlogController@update')->name(getRouteName($module_name, 'update'));
        Route::delete('{article}', 'BlogController@destroy')->name(getRouteName($module_name, 'destroy'));
        Route::post('mass-actions', 'BlogController@massActions')->name(getRouteName($module_name, 'mass_actions'));

        /* Blog Categories */
        Route::group(['prefix' => 'categories'], function () {
            $module_name = 'blog_categories';
            Route::get('/', 'BlogCategoriesController@index')->name(getRouteName($module_name, 'index'));
            Route::get('/create', 'BlogCategoriesController@create')->name(getRouteName($module_name, 'create'));
            Route::get('{blogCategory}/edit', 'BlogCategoriesController@edit')->name(getRouteName($module_name, 'edit'));
            Route::post('/', 'BlogCategoriesController@store')->name(getRouteName($module_name, 'store'));
            Route::put('{blogCategory}', 'BlogCategoriesController@update')->name(getRouteName($module_name, 'update'));
            Route::delete('{blogCategory}', 'BlogCategoriesController@destroy')->name(getRouteName($module_name, 'destroy'));
            Route::post('mass-actions', 'BlogCategoriesController@massActions')->name(getRouteName($module_name, 'mass_actions'));
        });
    });

    /* Projects */
    Route::group(['prefix' => 'projects'], function () {
        $module_name = Project::getModuleName();
        Route::get('/', 'ProjectsController@index')->name(getRouteName($module_name, 'index'));
        Route::get('/{project}/edit', 'ProjectsController@edit')->name(getRouteName($module_name, 'edit'));
        Route::put('{project}', 'ProjectsController@update')->name(getRouteName($module_name, 'update'));
        Route::delete('{project}', 'ProjectsController@destroy')->name(getRouteName($module_name, 'destroy'));
        Route::post('/', 'ProjectsController@store')->name(getRouteName($module_name, 'store'));
        Route::get('/create', 'ProjectsController@create')->name(getRouteName($module_name, 'create'));
        Route::get('{project}/images', 'ProjectsController@images')->name(getRouteName($module_name, 'images'));
        Route::put('{project}/images/add', 'ProjectsController@addImage')->name(getRouteName($module_name, 'images_add'));
        Route::put('{project}/images', 'ProjectsController@removeImage')->name(getRouteName($module_name, 'images_destroy'));
        Route::post('mass-actions', 'ProjectsController@massActions')->name(getRouteName($module_name, 'mass_actions'));

        /* Projects categories */
        Route::group(['prefix' => 'categories'], function () {
            $module_name = 'project_categories';
            Route::get('/', 'ProjectCategoriesController@index')->name(getRouteName($module_name, 'index'));
            Route::get('/{projectCategory}/edit', 'ProjectCategoriesController@edit')->name(getRouteName($module_name, 'edit'));
            Route::put('{projectCategory}', 'ProjectCategoriesController@update')->name(getRouteName($module_name, 'update'));
            Route::delete('{projectCategory}', 'ProjectCategoriesController@destroy')->name(getRouteName($module_name, 'destroy'));
            Route::post('/', 'ProjectCategoriesController@store')->name(getRouteName($module_name, 'store'));
            Route::get('/create', 'ProjectCategoriesController@create')->name(getRouteName($module_name, 'create'));
            Route::post('mass-actions', 'ProjectCategoriesController@massActions')->name(getRouteName($module_name, 'mass_actions'));
        });
    });

    /* Settings */
    Route::group(['prefix' => 'settings'], function () {
        $module_name = 'settings';
        Route::get('/', 'SettingsController@index')->name(getRouteName($module_name, 'index'));
        Route::post('/', 'SettingsController@store')->name(getRouteName($module_name, 'store'));
        Route::put('{setting}', 'SettingsController@update')->name(getRouteName($module_name, 'update'));
        Route::delete('{setting}', 'SettingsController@destroy')->name(getRouteName($module_name, 'destroy'));
    });

    /* Menus */
    Route::group(['prefix' => 'menus'], function () {
        $module_name = 'menus';
        Route::get('/', 'MenusController@index')->name(getRouteName($module_name, 'index'));
        Route::get('{menu}/edit', 'MenusController@edit')->name(getRouteName($module_name, 'edit'));
        Route::get('{menu}/builder', 'MenusController@menuBuilder')->name(getRouteName($module_name, 'builder'));
        Route::put('{menu}', 'MenusController@update')->name(getRouteName($module_name, 'update'));
        Route::delete('{menu}', 'MenusController@destroy')->name(getRouteName($module_name, 'destroy'));
        Route::post('/', 'MenusController@store')->name(getRouteName($module_name, 'store'));
        Route::get('create', 'MenusController@create')->name(getRouteName($module_name, 'create'));
        Route::post('mass-actions', 'MenusController@massActions')->name(getRouteName($module_name, 'mass_actions'));

        /* Menu items */
        Route::post('{menu}/items/create', 'MenuItemsController@store')->name(getRouteName($module_name, 'item_store'));
        Route::delete('items/{menuItem}', 'MenuItemsController@destroy')->name(getRouteName($module_name, 'item_destroy'));
        Route::put('items/{menuItem}', 'MenuItemsController@update')->name(getRouteName($module_name, 'item_update'));

    });

    /* Users */
    Route::group(['prefix' => 'users'], function () {
        $module_name = 'users';
        Route::get('/', 'UsersController@index')->name(getRouteName($module_name, 'index'));
        Route::get('{user}/edit', 'UsersController@edit')->name(getRouteName($module_name, 'edit'));
        Route::put('{user}/reset-password', 'UsersController@resetPassword')->name(getRouteName($module_name, 'reset_password'));
        Route::put('{user}', 'UsersController@update')->name(getRouteName($module_name, 'update'));
        Route::put('{user}/role-update', 'UsersController@updateUserRole')->name(getRouteName($module_name, 'role_update'));
        Route::delete('{user}', 'UsersController@destroy')->name(getRouteName($module_name, 'destroy'));
        Route::post('/', 'UsersController@store')->name(getRouteName($module_name, 'store'));
        Route::get('create', 'UsersController@create')->name(getRouteName($module_name, 'create'));
        Route::post('mass-actions', 'UsersController@massActions')->name(getRouteName($module_name, 'mass_actions'));

        /* Roles */
        Route::group(['prefix' => 'roles'], function () {
            $module_name = 'roles';
            Route::get('/', 'RolesController@index')->name(getRouteName($module_name,'index'));
            Route::post('/', 'RolesController@store')->name(getRouteName($module_name, 'store'));
            Route::get('create', 'RolesController@create')->name(getRouteName($module_name, 'create'));
            Route::put('{role}', 'RolesController@update')->name(getRouteName($module_name, 'update'));
            Route::get('{role}/edit', 'RolesController@edit')->name(getRouteName($module_name, 'edit'));
            Route::delete('{role}', 'RolesController@destroy')->name(getRouteName($module_name, 'destroy'));
            Route::get('{role}/set-permissions', 'RolesController@setPermissions')->name(getRouteName($module_name, 'permission_set_permission'));
            Route::put('{role}/update-permissions', 'RolesController@updatePermissions')->name(getRouteName($module_name, 'permission_update_permission'));
            Route::post('mass-actions', 'RolesController@massActions')->name(getRouteName($module_name, 'mass_actions'));
        });
    });

});
