<?php

namespace App\Http\Controllers\Admin;

use App\Article;
use App\BlogCategory;
use App\Http\Requests\Blog\ArticleRequest;

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

    public function store(ArticleRequest $request)
    {
        $request->storeArticle();
        return redirect(route(getRouteName('blog', 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Article has been created successfully'
        ]);
    }

    public function update(ArticleRequest $request, Article $article)
    {
        $request->updateArticle($article);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Article has been updated successfully'
        ]);
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
