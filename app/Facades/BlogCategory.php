<?php


namespace App\Facades;


use Illuminate\Support\Facades\Facade;

class BlogCategory extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'admin.blog_category';
    }
}
