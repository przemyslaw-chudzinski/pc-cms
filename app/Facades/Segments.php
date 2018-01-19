<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class Segments extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'admin.segments';
    }
}