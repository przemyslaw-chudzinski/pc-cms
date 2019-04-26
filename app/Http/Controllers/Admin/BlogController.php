<?php

namespace App\Http\Controllers\Admin;

use App\Article;
use App\Core\Contracts\Repositories\BlogCategoryRepository;
use App\Core\Contracts\Repositories\BlogRepository;
use App\Facades\Blog;
use App\Http\Requests\Blog\ArticleAjaxRequest;
use App\Http\Requests\Blog\ArticleRequest;
use App\Http\Requests\UpdateImageAjaxRequest;
use App\Http\Requests\UploadImagesRequest;
use App\Project;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View as ViewAlias;

class BlogController extends BaseController
{
    private $blogRepository;
    private $blogCategoryRepository;

    public function __construct(BlogRepository $blogRepository, BlogCategoryRepository $blogCategoryRepository)
    {
        $this->blogRepository = $blogRepository;
        $this->blogCategoryRepository = $blogCategoryRepository;
    }

    /**
     * @return Factory|ViewAlias
     */
    public function index()
    {
        $articles = $this->blogRepository->list();
        return $this->loadView('articles.index', ['articles' => $articles]);
    }

    /**
     * @param Article $article
     * @return Factory|ViewAlias
     */
    public function edit(Article $article)
    {
        $categories = $this->blogCategoryRepository->all();
        return $this->loadView('articles.edit', ['article' => $article, 'categories' => $categories]);
    }

    /**
     * @return Factory|ViewAlias
     */
    public function create()
    {
        $categories = $this->blogCategoryRepository->all();
        return $this->loadView('articles.create', ['categories' => $categories]);
    }

    /**
     * @param Article $article
     * @return Factory|ViewAlias
     */
    public function images(Article $article)
    {
        return $this->loadView('articles.images', ['article' => $article]);
    }

    /**
     * @param ArticleRequest $request
     * @return RedirectResponse
     */
    public function store(ArticleRequest $request)
    {
        $this->blogRepository->create($request->getPayload(), Auth::id());

        return redirect(route(getRouteName(Blog::getModuleName(), 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Article has been created successfully'
        ]);
    }

    /**
     * @param ArticleRequest $request
     * @param Article $article
     * @return RedirectResponse
     */
    public function update(ArticleRequest $request, Article $article)
    {
        $this->blogRepository->update($article, $request->getPayload());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Article has been updated successfully'
        ]);
    }

    /**
     * @param Article $article
     * @return RedirectResponse
     */
    public function destroy(Article $article)
    {
        $this->blogRepository->delete($article);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Article has been deleted successfully'
        ]);
    }

    /**
     * @param UploadImagesRequest $request
     * @param Article $article
     * @return RedirectResponse
     */
    public function addImage(UploadImagesRequest $request, Article $article)
    {
        $this->blogRepository->pushImage($article, $request->all());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Image has been added successfully'
        ]);
    }

    /**
     * @return RedirectResponse
     */
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

    public function updateSlugAjax(ArticleAjaxRequest $request, Article $article)
    {
        $newSlug = $request->updateSlug($article);
        if (is_array($newSlug)) return $newSlug;
        return [
            'newSlug' => $newSlug,
            'message' => 'Slug has been updated successfully',
            'type' => 'success'
        ];
    }

    /**
     * @param UpdateImageAjaxRequest $request
     * @param Project $project
     * @return array
     */
    public function selectImageAjax(UpdateImageAjaxRequest $request, Project $project)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return response()->json([
            'message' => $validator->errors()->first(),
            'type' => 'error'
        ], 422);

        $this->blogRepository->markImageAsSelected($project, $request->getImageID());

        return [
            'message' => 'Image has been selected',
            'type' => 'success',
            'imageID' => (int) $request->getImageID()
        ];
    }

    /**
     * @param UpdateImageAjaxRequest $request
     * @param Project $project
     * @return array|JsonResponse
     */
    public function removeImageAjax(UpdateImageAjaxRequest $request, Project $project)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return response()->json([
            'message' => $validator->errors()->first(),
            'type' => 'error'
        ], 422);

        $this->blogRepository->removeImages($project, $request->getImageID());

        return [
            'message' => 'Image has been removed successfully',
            'type' => 'success',
            'imageID' => (int) $request->getImageID()
        ];
    }
}
