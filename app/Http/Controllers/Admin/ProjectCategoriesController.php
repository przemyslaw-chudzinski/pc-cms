<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Project\CategoryAjaxRequest;
use App\Http\Requests\Project\CategoryRequest;
use App\ProjectCategory;

class ProjectCategoriesController extends BaseController
{
    public function index()
    {
        $categories = ProjectCategory::getModelDataWithPagination();
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

    public function togglePublishedAjax(CategoryAjaxRequest $request, ProjectCategory $category)
    {
        $updatedCategory = $request->toggle($category, 'published');
        return response()->json([
            'types' => 'success',
            'message' => 'Status has been updated successfully',
            'newStatus' => (bool)$updatedCategory->published
        ]);
    }

    public function updateSlugAjax(CategoryAjaxRequest $request, ProjectCategory $category)
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
