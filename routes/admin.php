<?php

Route::group(['prefix' => 'backend', 'namespace' => 'Admin'], function () {

    Route::get('/', 'BackendController@index')->name('admin.backend.index');

    /* Segments */
    Route::group(['prefix' => 'segments'], function () {
        Route::get('/', 'SegmentsController@index')->name('admin.segments.index');
        Route::get('/{segment}/edit', 'SegmentsController@edit')->name('admin.segments.edit');
        Route::put('{segment}', 'SegmentsController@update')->name('admin.segments.update');
        Route::delete('{segment}', 'SegmentsController@destroy')->name('admin.segments.destroy');
        Route::post('/', 'SegmentsController@store')->name('admin.segments.store');
        Route::get('/create', 'SegmentsController@create')->name('admin.segments.create');
    });

    /* Pages */
    Route::group(['prefix' => 'pages'], function () {
        Route::get('/', 'PagesController@index')->name('admin.pages.index');
        Route::get('/{page}/edit', 'PagesController@edit')->name('admin.pages.edit');
        Route::put('{page}', 'PagesController@update')->name('admin.pages.update');
        Route::delete('{page}', 'PagesController@destroy')->name('admin.pages.destroy');
        Route::post('/', 'PagesController@store')->name('admin.pages.store');
        Route::get('/create', 'PagesController@create')->name('admin.pages.create');
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
            Route::get('/', 'BlogCategories@index')->name('admin.articles.categories.index');
            Route::get('/create', 'BlogCategories@create')->name('admin.articles.categories.create');
            Route::get('{blogCategory}/edit', 'BlogCategories@edit')->name('admin.articles.categories.edit');
            Route::post('/', 'BlogCategories@store')->name('admin.articles.categories.store');
            Route::put('{blogCategory}', 'BlogCategories@update')->name('admin.articles.categories.update');
//            Route::delete('{article}', 'BlogCategories@destroy')->name('admin.articles.categories.destroy');
        });
    });

});