<?php

namespace App\Http\Controllers\Admin;

use App\Menu;

class MenusController extends BaseController
{
    public function index()
    {
        $menus = Menu::getMenusWithPagination();
        return $this->loadView('menus.index', ['menus' => $menus]);
    }

    public function create()
    {
        return $this->loadView('menus.create');
    }

    public function edit(Menu $menu)
    {
        return $this->loadView('menus.edit', ['menu' => $menu]);
    }

    public function menuBuilder(Menu $menu)
    {
        return $this->loadView('menus.menuBuilder', ['menu' => $menu]);
    }

    public function update(Menu $menu)
    {
        return $menu->updateMenu();
    }

    public function store()
    {
        return Menu::createMenu();
    }

    public function destroy(Menu $menu)
    {
        return $menu->removeMenu();
    }

    public function massActions()
    {
        return Menu::massActions();
    }
}
