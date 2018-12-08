<?php

namespace App\Http\Controllers\Admin;

use App\BlogCategory;

class BlogCategoriesController extends BaseController
{
    public function index()
    {
        $categories = BlogCategory::getCategoriesWithPagination();
        return $this->loadView('blogCategories.index', ['categories' => $categories]);
    }

    public function create()
    {
        $categories = BlogCategory::getAllCategories();
        return $this->loadView('blogCategories.create', ['categories' => $categories]);
    }

    public function edit(BlogCategory $blogCategory)
    {
        $categories = BlogCategory::getAllCategories();
        return $this->loadView('blogCategories.edit', ['category' => $blogCategory, 'categories' => $categories]);
    }

    public function store()
    {
        return BlogCategory::createNewCategory();
    }

    public function update(BlogCategory $blogCategory)
    {
        return $blogCategory->updateCategory();
    }

    public function destroy(BlogCategory $blogCategory)
    {
        return $blogCategory->removeCategory();
    }

    public function massActions()
    {
        return BlogCategory::massActions();
    }
}
