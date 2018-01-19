<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Page;

class PagesController extends Controller
{
    public function togglePublished(Page $page)
    {
        return $page->toggleStatusAjax();
    }
}
