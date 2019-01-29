<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Project\ProjectAjaxRequest;
use App\Http\Requests\Project\ProjectRequest;
use App\Project;
use App\ProjectCategory;

class ProjectsController extends BaseController
{
    public function index()
    {
        $projects = Project::getModelDataWithPagination();
        return $this->loadView('projects.index', ['projects' => $projects]);
    }

    public function create()
    {
        $categories = ProjectCategory::get();
        return $this->loadView('projects.create', ['categories' => $categories]);
    }

    public function edit(Project $project)
    {
        $categories = ProjectCategory::get();
        return $this->loadView('projects.edit', ['project' => $project, 'categories' => $categories]);
    }

    public function store(ProjectRequest $request)
    {
        $request->storeProject();
        return redirect(route(getRouteName('projects', 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Project has been created successfully'
        ]);
    }

    public function update(ProjectRequest $request, Project $project)
    {
        $request->updateProject($project);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Project has been updated successfully'
        ]);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Project has been deleted successfully'
        ]);
    }

    public function images(Project $project)
    {
        return $this->loadView('projects.images', ['project' => $project]);
    }

    public function removeImage(Project $project)
    {
        return $project->removeImage();
    }

    public function addImage(Project $project)
    {
        return $project->addImage();
    }

    public function massActions()
    {
        return Project::massActions();
    }

    public function togglePublishedAjax(ProjectAjaxRequest $request, Project $project)
    {
        $updatedProject = $request->toggle($project, 'published');
        return response()->json([
            'types' => 'success',
            'message' => 'Status has been updated successfully',
            'newStatus' => (bool) $updatedProject->published
        ]);
    }

    public function updateSlugAjax(ProjectAjaxRequest $request, Project $project)
    {
        $newSlug = $request->updateSlug($project);
        if (is_array($newSlug)) return $newSlug;
        return [
            'newSlug' => $newSlug,
            'message' => 'Slug has been updated successfully',
            'type' => 'success'
        ];
    }
}
