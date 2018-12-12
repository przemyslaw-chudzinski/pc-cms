<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Project\CategoryRequest;
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

    public function store(CategoryRequest $request)
    {
        $request->storeCategory();
        return redirect(route(getRouteName('project_categories', 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Category has been created successfully'
        ]);
    }

    public function edit(ProjectCategory $projectCategory)
    {
        return $this->loadView('projectCategories.edit', ['category' => $projectCategory]);
    }

    public function update(CategoryRequest $request, ProjectCategory $projectCategory)
    {
        $request->updateCategory($projectCategory);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Category has been updated successfully'
        ]);
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
