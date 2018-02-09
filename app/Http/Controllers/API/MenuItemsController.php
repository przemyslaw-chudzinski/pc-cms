<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Menu;
use App\MenuItem;

class MenuItemsController extends Controller
{
    public function destroy(Menu $menu, MenuItem $menuItem)
    {
        return $menuItem->removeItemAjax();
    }
}
