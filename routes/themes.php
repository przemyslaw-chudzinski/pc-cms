<?php

Route::group([
    'namespace' => 'Themes',
    'middleware' => ['theme.maintenance_mode']
], function () {

    /* Load home page */
    Route::get('/', 'ThemeController@index')->name('theme.index');

    /* Load other pages */
    Route::get('/{slug}', 'ThemeController@showPage')->name('theme.show_page');

});