<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Menu\MenuItemRequest;
use App\Menu;
use App\MenuItem;

class MenuItemsController extends BaseController
{
    public function store(MenuItemRequest $request, Menu $menu)
    {
        $request->storeItem($menu);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Menu item has been created successfully'
        ]);
    }

    public function update(MenuItemRequest $request, MenuItem $menuItem)
    {
        $request->updateItem($menuItem);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Menu item has been updated successfully'
        ]);
    }

    public function destroy(MenuItem $menuItem)
    {
        $menuItem->delete();
    }
}
