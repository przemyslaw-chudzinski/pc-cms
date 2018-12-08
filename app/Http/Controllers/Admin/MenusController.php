<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Menu;

class MenusController extends Controller
{
    public function index()
    {
        $menus = Menu::getMenusWithPagination();
        return view('admin.material_theme.menus.index', ['menus' => $menus]);
    }

    public function create()
    {
        return view('admin.material_theme.menus.create');
    }

    public function edit(Menu $menu)
    {
        return view('admin.material_theme.menus.edit', ['menu' => $menu]);
    }

    public function menuBuilder(Menu $menu)
    {
        return view('admin.material_theme.menus.menuBuilder', ['menu' => $menu]);
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
