let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

/* For base theme */
// mix.js('resources/assets/js/app.js', 'public/js')
//    .sass('resources/assets/sass/app.scss', 'public/css');

/* For material_theme */
mix.js('resources/views/admin/material_theme/assets/js/app.js', 'public/js')
    .sass('resources/views/admin/material_theme/assets/sass/app.scss', 'public/css');
