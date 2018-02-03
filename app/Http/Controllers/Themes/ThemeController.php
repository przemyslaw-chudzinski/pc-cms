<?php

namespace App\Http\Controllers\Themes;

use App\Article;
use App\Http\Controllers\Controller;

class ThemeController extends Controller
{
    public function index()
    {
        $articles = Article::where('published', true)->latest()->limit(4)->get();
        return view('themes.index', ['articles' => $articles]);
    }
}
