<?php

namespace App\Http\Controllers\Admin;

use App\Article;
use App\BlogCategory;
use App\Http\Requests\Blog\ArticleAjaxRequest;
use App\Http\Requests\Blog\ArticleRequest;

class BlogController extends BaseController
{
    public function index()
    {
        $articles = Article::getModelDataWithPagination();
        return $this->loadView('articles.index', ['articles' => $articles]);
    }

    public function edit(Article $article)
    {
        $categories = BlogCategory::get();
        return $this->loadView('articles.edit', ['article' => $article, 'categories' => $categories]);
    }

    public function create()
    {
        $categories = BlogCategory::get();
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
        $article->delete();
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Article has been deleted successfully'
        ]);
    }

    public function massActions()
    {
        return Article::massActions();
    }

    public function togglePublishedAjax(ArticleAjaxRequest $request, Article $article)
    {
        $updatedArticle = $request->toggle($article, 'published');
        return response()->json([
            'types' => 'success',
            'message' => __('messages.update_status'),
            'newStatus' => (bool)$updatedArticle->published
        ]);
    }

    public function toggleCommentsStatusAjax(ArticleAjaxRequest $request, Article $article)
    {
        $updatedArticle = $request->toggle($article, 'allow_comments');
        return response()->json([
            'types' => 'success',
            'message' => __('messages.update_status'),
            'newStatus' => (bool)$updatedArticle->allow_comments
        ]);
    }
}
