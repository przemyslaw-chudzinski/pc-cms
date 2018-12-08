<?php

namespace App\Http\Controllers\Admin;

use App\Core\Services\ThemeService;

class ThemesController extends BaseController
{
    public function index()
    {
        $themes = ThemeService::getThemesList();
        $currentTheme = ThemeService::getTheme();
        return $this->loadView('themes.index', ['themes' => $themes, 'currentTheme' => $currentTheme]);
    }

    public function update()
    {
        return ThemeService::updateTheme();
    }
}
