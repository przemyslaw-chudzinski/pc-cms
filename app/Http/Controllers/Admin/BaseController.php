<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\Factory;
use Illuminate\View\View;

class BaseController extends Controller
{
    /**
     * @param $path
     * @param array $data
     * @return Factory|View
     */
    protected function loadView($path, $data = [])
    {
        return view('admin::' . $path, $data);
    }
}
