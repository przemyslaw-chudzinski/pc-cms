<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class ProjectCategory extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'admin.project_categories';
    }
}
