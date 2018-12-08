<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class BackendController extends Controller
{
    public function index()
    {
        return view('admin::backend.index');
    }
}
