<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\ProjectCategory;

class ProjectCategoriesController extends Controller
{
    public function index()
    {
        $categories = ProjectCategory::getCategoriesWithPagination();
        return view('admin.projectCategories.index', ['categories' => $categories]);
    }

    public function create()
    {
        return view('admin.projectCategories.create');
    }

    public function store()
    {
        return ProjectCategory::createNewCategory();
    }

    public function edit(ProjectCategory $projectCategory)
    {
        return view('admin.projectCategories.edit', ['category' => $projectCategory]);
    }

    public function update(ProjectCategory $projectCategory)
    {
        return $projectCategory->updateCategory();
    }

    public function destroy(ProjectCategory $projectCategory)
    {
        return $projectCategory->removeCategory();
    }
}
