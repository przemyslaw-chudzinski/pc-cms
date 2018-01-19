<?php

Route::group(['namespace' => 'Themes'], function () {

    Route::get('/', 'ThemeController@index');

});