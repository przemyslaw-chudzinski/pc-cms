<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Project\ProjectRequest;
use App\Project;
use App\ProjectCategory;

class ProjectsController extends BaseController
{
    public function index()
    {
        $projects = Project::getProjectsWithPagination();
        return $this->loadView('projects.index', ['projects' => $projects]);
    }

    public function create()
    {
        $categories = ProjectCategory::getCategories();
        return $this->loadView('projects.create', ['categories' => $categories]);
    }

    public function edit(Project $project)
    {
        $categories = ProjectCategory::getCategories();
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
        ]);    }

    public function destroy(Project $project)
    {
        return $project->removeProject();
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
}
