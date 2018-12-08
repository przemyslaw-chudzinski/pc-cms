<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;


class MassActions extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'admin.mass_actions';
    }
}