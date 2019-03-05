<?php

namespace App\Core;

use App\Menu as MenuModel;

class Menu
{

    public function render($key, $template)
    {
        $data = [];
        $menuItems = [];
        $menu = MenuModel::where([
            ['slug', $key],
            ['published', true]
        ])
            ->get()
            ->first();
        if (isset($menu)) $menuItems = $menu->getItems();
        if (isset($menuItems)) $data['items'] = $menuItems;
        return view($template, $data);
    }

}
