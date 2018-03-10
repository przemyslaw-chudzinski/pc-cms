<?php

namespace App\Http\Controllers\Themes;

use App\Http\Controllers\Controller;
use App\Core\Services\ThemeService;

class ThemeController extends Controller
{
    public function index()
    {
        $theme = ThemeService::getTheme();
        return view('themes.'.$theme.'.index');
    }

    public function showPage($slug)
    {
        return ThemeService::getView($slug);
    }

    public function showSingleArticle($slug)
    {
        return ThemeService::getSingleArticleView($slug);
    }

    public function showArticlesByCategory($slug)
    {
        return ThemeService::showArticlesViewByCategory($slug);
    }

    public function maintenance()
    {
        return ThemeService::getMaintenanceMode();
    }
}
