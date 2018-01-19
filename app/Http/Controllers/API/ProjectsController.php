<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Project;

class ProjectsController extends Controller
{
    public function togglePublished(Project $project)
    {
        return $project->toggleStatusAjax();
    }
}
