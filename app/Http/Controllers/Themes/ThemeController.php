<?php

namespace App\Http\Controllers\Themes;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ThemeController extends Controller
{
    public function index()
    {
        return view('themes.index');
    }
}
