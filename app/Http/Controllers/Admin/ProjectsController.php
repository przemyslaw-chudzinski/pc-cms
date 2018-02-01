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
        return view('admin.material_theme.projects.index', ['projects' => $projects]);
    }

    public function create()
    {
        $categories = ProjectCategory::getCategories();
        return view('admin.material_theme.projects.create', ['categories' => $categories]);
    }

    public function edit(Project $project)
    {
        $categories = ProjectCategory::getCategories();
        return view('admin.material_theme.projects.edit', ['project' => $project, 'categories' => $categories]);
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
}
