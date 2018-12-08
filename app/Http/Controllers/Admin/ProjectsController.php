<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Project;
use App\ProjectCategory;

class ProjectsController extends Controller
{
    public function index()
    {
        $projects = Project::getProjectsWithPagination();
        return view('admin::projects.index', ['projects' => $projects]);
    }

    public function create()
    {
        $categories = ProjectCategory::getCategories();
        return view('admin::projects.create', ['categories' => $categories]);
    }

    public function edit(Project $project)
    {
        $categories = ProjectCategory::getCategories();
        return view('admin::projects.edit', ['project' => $project, 'categories' => $categories]);
    }

    public function store()
    {
        return Project::createNewProject();
    }

    public function update(Project $project)
    {
        return $project->updateProject();
    }

    public function destroy(Project $project)
    {
        return $project->removeProject();
    }

    public function images(Project $project)
    {
        return view('admin::projects.images', ['project' => $project]);
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
