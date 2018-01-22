<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace' => 'API'], function () {

    Route::group(['prefix' => 'articles'], function () {
        Route::post('{article}/togglePublished', 'ArticlesController@togglePublished'); // potrzeban autoryzacja
        Route::post('categories/{blogCategory}/togglePublished', 'BlogCategoriesController@togglePublished'); // potrzebna autoryzacja
    });

    Route::post('pages/{page}/togglePublished', 'PagesController@togglePublished'); // potrzebna autoryzacja

    Route::post('menus/{menu}/togglePublished', 'MenusController@togglePublished'); // potrzebna autoryzacja

    Route::group(['prefix' => 'projects'], function () {
        Route::post('{project}/togglePublished', 'ProjectsController@togglePublished'); // potrzeba autoryzacji
        Route::post('categories/{projectCategory}/togglePublished', 'ProjectCategoriesController@togglePublished'); // potrzebna autoryzacja
    });

});
