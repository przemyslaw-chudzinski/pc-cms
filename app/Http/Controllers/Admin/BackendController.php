<?php

namespace App\Http\Controllers\Admin;

class BackendController extends BaseController
{
    public function index()
    {
        return $this->loadView('backend.index');
    }
}
