<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/* Menus ajax routes */
Route::group(['prefix' => 'menus'], function() {
    Route::post('{menu}/togglePublished', 'MenusController@togglePublishedAjax');
    Route::get('{menu}/items', 'MenusController@getItemsAjax');
    Route::put('{menu}/updateTree', 'MenusController@updateTreeAjax');
    Route::delete('{menu}/items/{menuItem}', 'MenuItemsController@destroyAjax');
});

/* Articles ajax routes */
Route::group(['prefix' => 'articles'], function () {
    Route::post('{article}/togglePublished', 'BlogController@togglePublishedAjax');
    Route::post('{article}/toggleCommentsStatus', 'BlogController@toggleCommentsStatusAjax');
    Route::post('categories/{category}/togglePublished', 'BlogCategoriesController@togglePublishedAjax');
});

/* Pages ajax routes */
Route::post('pages/{page}/togglePublished', 'PagesController@togglePublishedAjax');

/* Projects ajax routes */
Route::group(['prefix' => 'projects'], function () {
    Route::post('{project}/togglePublished', 'ProjectsController@togglePublishedAjax'); // potrzeba autoryzacji
    Route::post('categories/{category}/togglePublished', 'ProjectCategoriesController@togglePublishedAjax'); // potrzebna autoryzacja
});