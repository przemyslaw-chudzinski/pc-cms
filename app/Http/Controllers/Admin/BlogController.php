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
use App\Facades\Blog as BlogModule;

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
        $this->blogRepository->pushImage($article, $request->all(), BlogModule::uploadDir());

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

    /**
     * @param Article $article
     * @return JsonResponse
     */
    public function togglePublishedAjax(Article $article)
    {
        $updatedArticle = $this->blogRepository->toggle($article,'published');

        return response()->json([
            'types' => 'success',
            'message' => __('messages.update_status'),
            'newStatus' => (bool)$updatedArticle->published
        ]);
    }

    /**
     * @param Article $article
     * @return JsonResponse
     */
    public function toggleCommentsStatusAjax(Article $article)
    {
        $updatedArticle = $this->blogRepository->toggle($article, 'allow_comments');

        return response()->json([
            'types' => 'success',
            'message' => __('messages.update_status'),
            'newStatus' => (bool)$updatedArticle->allow_comments
        ]);
    }

    /**
     * @param ArticleAjaxRequest $request
     * @param Article $article
     * @return array
     */
    public function updateSlugAjax(ArticleAjaxRequest $request, Article $article)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return [
            'message' => $validator->errors()->first(),
            'error' => true,
            'type' => 'error'
        ];

        $newSlug = $this->blogRepository->updateSlug($article, $request->all());

        return [
            'newSlug' => $newSlug,
            'message' => 'Slug has been updated successfully',
            'type' => 'success'
        ];
    }

    /**
     * @param UpdateImageAjaxRequest $request
     * @param Article $article
     * @return array
     */
    public function selectImageAjax(UpdateImageAjaxRequest $request, Article $article)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return response()->json([
            'message' => $validator->errors()->first(),
            'type' => 'error'
        ], 422);

        $this->blogRepository->markImageAsSelected($article, $request->getImageID());

        return [
            'message' => 'Image has been selected',
            'type' => 'success',
            'imageID' => (int) $request->getImageID()
        ];
    }

    /**
     * @param UpdateImageAjaxRequest $request
     * @param Article $article
     * @return array|JsonResponse
     */
    public function removeImageAjax(UpdateImageAjaxRequest $request, Article $article)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return response()->json([
            'message' => $validator->errors()->first(),
            'type' => 'error'
        ], 422);

        $this->blogRepository->removeImage($article, $request->getImageID());

        return [
            'message' => 'Image has been removed successfully',
            'type' => 'success',
            'imageID' => (int) $request->getImageID()
        ];
    }
}
