<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\ProjectCategory;

class ProjectCategoriesController extends Controller
{
    public function togglePublished(ProjectCategory $projectCategory)
    {
        return $projectCategory->toggleStatusAjax();
    }
}
