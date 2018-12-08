<?php

namespace App\Http\Controllers\Admin;

use App\ProjectCategory;

class ProjectCategoriesController extends BaseController
{
    public function index()
    {
        $categories = ProjectCategory::getCategoriesWithPagination();
        return $this->loadView('projectCategories.index', ['categories' => $categories]);
    }

    public function create()
    {
        return $this->loadView('projectCategories.create');
    }

    public function store()
    {
        return ProjectCategory::createNewCategory();
    }

    public function edit(ProjectCategory $projectCategory)
    {
        return $this->loadView('projectCategories.edit', ['category' => $projectCategory]);
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
