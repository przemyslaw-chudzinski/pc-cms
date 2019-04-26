<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/* Menus ajax routes */
Route::group(['prefix' => 'menus'], function() {
    Route::post('{menu}/togglePublished', 'MenusController@togglePublishedAjax');
    Route::get('{menu}/items', 'MenusController@getItemsAjax');
    Route::put('{menu}/update-tree', 'MenusController@updateTreeAjax');
    Route::delete('{menu}/items/{item}', 'MenuItemsController@destroyAjax');
    Route::post('{menu}/update-slug', 'MenusController@updateSlugAjax')->name('ajax.menus.updateSlug');
});

/* Articles ajax routes */
Route::group(['prefix' => 'articles'], function () {
    Route::post('{article}/togglePublished', 'BlogController@togglePublishedAjax');
    Route::post('{article}/toggleCommentsStatus', 'BlogController@toggleCommentsStatusAjax');
    Route::post('categories/{category}/togglePublished', 'BlogCategoriesController@togglePublishedAjax');
    Route::post('{article}/update-slug', 'BlogController@updateSlugAjax')->name('ajax.articles.updateSlug');
    Route::post('categories/{category}/update-slug', 'BlogCategoriesController@updateSlugAjax')->name('ajax.articles.categories.updateSlug');
    Route::delete('{project}/remove-image', 'BlogController@removeImageAjax')->name('ajax.articles.removeImage');
    Route::post('{project}/select-image', 'BlogController@selectImageAjax')->name('ajax.articles.selectImage');
});

/* Pages ajax routes */
Route::group(['prefix' => 'pages'], function () {
    Route::post('{page}/togglePublished', 'PagesController@togglePublishedAjax');
    Route::post('{page}/update-slug', 'PagesController@updateSlugAjax')->name('ajax.pages.updateSlug');
});

/* Projects ajax routes */
Route::group(['prefix' => 'projects'], function () {
    Route::post('{project}/togglePublished', 'ProjectsController@togglePublishedAjax'); // potrzeba autoryzacji
    Route::post('categories/{category}/togglePublished', 'ProjectCategoriesController@togglePublishedAjax'); // potrzebna autoryzacja
    Route::post('{project}/update-slug', 'ProjectsController@updateSlugAjax')->name('ajax.projects.updateSlug');
    Route::post('categories/{category}/update-slug', 'ProjectCategoriesController@updateSlugAjax')->name('ajax.projects.categories.updateSlug');
    Route::post('categories/{category}/select-image', 'ProjectCategoriesController@selectImageAjax')->name('ajax.projects.categories.selectImage');
    Route::delete('category/{category}/remove-image', 'ProjectCategoriesController@removeImageAjax')->name('ajax.projects.categories.removeImage');
    Route::delete('{project}/remove-image', 'ProjectsController@removeImageAjax')->name('ajax.projects.removeImage');
    Route::post('{project}/select-image', 'ProjectsController@selectImageAjax')->name('ajax.projects.selectImage');
});

/* Segments ajax routes */
Route::group(['prefix' => 'segments'], function () {
    Route::post('{segment}/select-image', 'SegmentsController@selectImageAjax')->name('ajax.segments.selectImage');
    Route::delete('{segment}/remove-image', 'SegmentsController@removeImageAjax')->name('ajax.segments.removeImage');
});
