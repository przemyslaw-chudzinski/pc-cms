<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Menu;
use App\MenuItem;

class MenuItemsController extends Controller
{
    public function store(Menu $menu)
    {
        return MenuItem::createItem($menu);
    }

    public function update(MenuItem $menuItem)
    {
        return $menuItem->updateItem();
    }

    public function destroy(MenuItem $menuItem)
    {
        return $menuItem->removeItem();
    }
}
