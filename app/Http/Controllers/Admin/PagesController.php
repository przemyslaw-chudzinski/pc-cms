<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Page;

class PagesController extends Controller
{
    public function index()
    {
        $pages = Page::getPagesWithPagination();
        return view('admin.pages.index', ['pages' => $pages]);
    }

    public function create()
    {
        return view('admin.pages.create');
    }

    public function edit(Page $page)
    {
        return view('admin.pages.edit', ['page' => $page]);
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
