<?php

namespace App\Http\Controllers\API;

use App\BlogCategory;
use App\Http\Controllers\Controller;

class BlogCategoriesController extends Controller
{
    public function togglePublished(BlogCategory $blogCategory)
    {
        return $blogCategory->toggleStatusAjax();
    }
}
