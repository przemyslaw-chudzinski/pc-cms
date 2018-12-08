<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    protected function loadView($path, $data = [])
    {
        return view('admin::' . $path, $data);
    }
}