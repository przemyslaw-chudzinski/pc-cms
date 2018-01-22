<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Menu;

class MenusController extends Controller
{
    public function index()
    {
        $menus = Menu::getMenusWithPagination();
        return view('admin.menus.index', ['menus' => $menus]);
    }

    public function create()
    {
        return view('admin.menus.create');
    }

    public function edit(Menu $menu)
    {
        return view('admin.menus.edit', ['menu' => $menu]);
    }

    public function update(Menu $menu)
    {
        return $menu->updateMenu();
    }

    public function store()
    {
        return Menu::createMenu();
    }
}
