<?php

namespace App\Http\Controllers\Admin;

use App\Page;

class PagesController extends BaseController
{
    public function index()
    {
        $pages = Page::getPagesWithPagination();
        return $this->loadView('pages.index', ['pages' => $pages]);
    }

    public function create()
    {
        return $this->loadView('pages.create');
    }

    public function edit(Page $page)
    {
        return $this->loadView('pages.edit', ['page' => $page]);
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

    public function massActions()
    {
        return Page::massActions();
    }
}
