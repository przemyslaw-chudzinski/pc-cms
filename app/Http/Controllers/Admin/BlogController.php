<?php

namespace App\Http\Controllers\Admin;

use App\Article;
use App\BlogCategory;
use App\Http\Controllers\Controller;

class BlogController extends BaseController
{
    public function index()
    {
        $articles = Article::getArticlesWithPagination();
        return $this->loadView('articles.index', ['articles' => $articles]);
    }

    public function edit(Article $article)
    {
        $categories = BlogCategory::getAllCategories();
        return $this->loadView('articles.edit', ['article' => $article, 'categories' => $categories]);
    }

    public function create()
    {
        $categories = BlogCategory::getAllCategories();
        return $this->loadView('articles.create', ['categories' => $categories]);
    }

    public function store()
    {
        return Article::createNewArticle();
    }

    public function update(Article $article)
    {
        return $article->updateArticle();
    }

    public function destroy(Article $article)
    {
        return $article->removeArticle();
    }

    public function massActions()
    {
        return Article::massActions();
    }
}
