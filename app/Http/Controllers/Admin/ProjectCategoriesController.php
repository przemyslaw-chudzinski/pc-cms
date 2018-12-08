<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\ProjectCategory;

class ProjectCategoriesController extends Controller
{
    public function index()
    {
        $categories = ProjectCategory::getCategoriesWithPagination();
        return view('admin.material_theme.projectCategories.index', ['categories' => $categories]);
    }

    public function create()
    {
        return view('admin.material_theme.projectCategories.create');
    }

    public function store()
    {
        return ProjectCategory::createNewCategory();
    }

    public function edit(ProjectCategory $projectCategory)
    {
        return view('admin.material_theme.projectCategories.edit', ['category' => $projectCategory]);
    }

    public function update(ProjectCategory $projectCategory)
    {
        return $projectCategory->updateCategory();
    }

    public function destroy(ProjectCategory $projectCategory)
    {
        return $projectCategory->removeCategory();
    }

    public function massActions()
    {
        return ProjectCategory::massActions();
    }
}
