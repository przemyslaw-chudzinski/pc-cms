<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class Segment extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'admin.segment';
    }
}
