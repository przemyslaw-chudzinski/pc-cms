<?php

namespace App\Http\Controllers\Admin;

use App\BlogCategory;
use App\Http\Requests\Blog\CategoryAjaxRequest;
use App\Http\Requests\Blog\CategoryRequest;

class BlogCategoriesController extends BaseController
{
    public function index()
    {
        $categories = BlogCategory::getModelDataWithPagination();
        return $this->loadView('blogCategories.index', ['categories' => $categories]);
    }

    public function create()
    {
        $categories = BlogCategory::get();
        return $this->loadView('blogCategories.create', ['categories' => $categories]);
    }

    public function edit(BlogCategory $blogCategory)
    {
        $categories = BlogCategory::get();
        return $this->loadView('blogCategories.edit', ['category' => $blogCategory, 'categories' => $categories]);
    }

    public function store(CategoryRequest $request)
    {
        $request->storeCategory();
        return redirect(route(getRouteName('blog_categories', 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Category has been created successfully'
        ]);
    }

    public function update(CategoryRequest $request, BlogCategory $blogCategory)
    {
        $request->updateCategory($blogCategory);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Category has been updated successfully'
        ]);
    }

    public function destroy(BlogCategory $blogCategory)
    {
        return 'todo';
    }

    public function massActions()
    {
        return BlogCategory::massActions();
    }

    public function togglePublishedAjax(CategoryAjaxRequest $request, BlogCategory $category)
    {
        $updatedCategory = $request->toggle($category, 'published');
        return response()->json([
            'types' => 'success',
            'message' => 'Status has been updated successfully',
            'newStatus' => (bool)$updatedCategory->published
        ]);
    }

    public function updateSlugAjax(CategoryAjaxRequest $request, BlogCategory $category)
    {
        $newSlug = $request->updateSlug($category);
        if (is_array($newSlug)) return $newSlug;
        return [
            'newSlug' => $newSlug,
            'message' => 'Slug has been updated successfully',
            'type' => 'success'
        ];
    }
}
