<?php

namespace App\Http\Controllers\API;

use App\Article;
use App\Http\Controllers\Controller;

class ArticlesController extends Controller
{
    public function togglePublished(Article $article)
    {
        return $article->toggleStatusAjax();
    }

    public function toggleCommentsStatus(Article $article)
    {
        return $article->toggleCommentsStatusAjax();
    }
}
