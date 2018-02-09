<?php

namespace App\Http\Controllers\Admin;

use App\Core\Services\ThemeService;
use App\Http\Controllers\Controller;
use App\Page;

class PagesController extends Controller
{
    public function index()
    {
        $pages = Page::getPagesWithPagination();
        return view('admin.material_theme.pages.index', ['pages' => $pages]);
    }

    public function create()
    {
        return view('admin.material_theme.pages.create');
    }

    public function edit(Page $page)
    {
        return view('admin.material_theme.pages.edit', ['page' => $page]);
    }

    public function store()
    {
        return Page::createNewPage();
    }

    public function update(Page $page)
    {
        return $page->updatePage();
    }

    public function destroy(Page $page)
    {
        return $page->removePage();
    }
}
