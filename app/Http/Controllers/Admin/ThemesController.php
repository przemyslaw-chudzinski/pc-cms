<?php

namespace App\Http\Controllers\Admin;

use App\Core\Services\ThemeService;
use App\Http\Controllers\Controller;
use App\Setting;

class ThemesController extends Controller
{
    public function index()
    {
        $themes = ThemeService::getThemesList();
        $currentTheme = ThemeService::getTheme();
        return view('admin.material_theme.themes.index', ['themes' => $themes, 'currentTheme' => $currentTheme]);
    }

    public function update()
    {
        return ThemeService::updateTheme();
    }
}
