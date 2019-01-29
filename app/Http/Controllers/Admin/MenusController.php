<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Menu\MenuAjaxRequest;
use App\Http\Requests\Menu\MenuRequest;
use App\Menu;

class MenusController extends BaseController
{
    public function index()
    {
        $menus = Menu::getModelDataWithPagination();
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

    public function update(MenuRequest $request, Menu $menu)
    {
        $request->updateMenu($menu);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Menus has been updated successfully'
        ]);
    }

    public function store(MenuRequest $request)
    {
        $request->storeMenu();
        return redirect(route(getRouteName('menus', 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Menu has been created successfully'
        ]);
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Menu has been deleted successfully'
        ]);
    }

    public function massActions()
    {
        return Menu::massActions();
    }

    public function togglePublishedAjax(MenuAjaxRequest $request, Menu $menu)
    {
        $updatedMenu = $request->toggle($menu, 'published');
        return response()->json([
            'type' => 'success',
            'message' => __('messages.update_status'),
            'newStatus' => (bool)$updatedMenu->published
        ]);
    }

    public function getItemsAjax(Menu $menu)
    {
        return $menu->getItems();
    }

    public function updateTreeAjax(MenuAjaxRequest $request)
    {
        $request->updateTree();
        return response()->json([
            'type' => 'success',
            'message' => 'Menu has been updated successfully'
        ]);
    }

    public function destroyAjax()
    {

    }

    public function updateSlugAjax(MenuAjaxRequest $request, Menu $menu)
    {
        $newSlug = $request->updateSlug($menu);
        if (is_array($newSlug)) return $newSlug;
        return [
            'newSlug' => $newSlug,
            'message' => 'Slug has been updated successfully',
            'type' => 'success'
        ];
    }
}
