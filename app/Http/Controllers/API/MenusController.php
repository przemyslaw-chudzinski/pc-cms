<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Menu;

class MenusController extends Controller
{
    public function togglePublished(Menu $menu)
    {
        return $menu->toggleStatusAjax();
    }

    public function getItems(Menu $menu)
    {
        return $menu->getItemsAjax();
    }
}
