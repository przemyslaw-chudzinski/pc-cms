<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Page\PageRequest;
use App\Page;

class PagesController extends BaseController
{
    public function index()
    {
        $pages = Page::getModelDataWithPagination();
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

    public function store(PageRequest $request)
    {
        $request->storePage();
        return redirect(route(getRouteName('pages', 'index')))->with('alert', [
            'type' => 'success',
            'message' => __('messages.item_created_success')
        ]);
    }

    public function update(PageRequest $request, Page $page)
    {
        $request->updatePage($page);
        return back()->with('alert', [
            'type' => 'success',
            'message' => __('messages.item_updated_success')
        ]);
    }

    public function destroy(Page $page)
    {
        $page->delete();
        return back()->with('alert', [
            'type' => 'success',
            'message' => __('messages.item_deleted_success')
        ]);
    }

    public function massActions()
    {
        return Page::massActions();
    }
}
