<?php

Route::group(['namespace' => 'Themes'], function () {

    Route::get('/', 'ThemeController@index')->name('theme.index');

});