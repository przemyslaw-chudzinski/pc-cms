<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Contracts\View\Factory;
use Illuminate\View\View;

class BackendController extends BaseController
{
    /**
     * @return Factory|View
     */
    public function index()
    {
        return $this->loadView('backend.index');
    }
}
