<?php

namespace App\Http\Controllers\Admin;

use App\BlogCategory;
use App\Core\Contracts\Repositories\BlogCategoryRepository;
use App\Http\Requests\Blog\CategoryAjaxRequest;
use App\Http\Requests\Blog\CategoryRequest;
use App\Http\Requests\UpdateImageAjaxRequest;
use App\Http\Requests\UploadImagesRequest;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use App\Facades\BlogCategory as BlogCategoryModule;

class BlogCategoriesController extends BaseController
{
    /**
     * @var BlogCategoryRepository
     */
    private $blogCategoryRepository;

    public function __construct(BlogCategoryRepository $blogCategoryRepository)
    {
        $this->blogCategoryRepository = $blogCategoryRepository;
    }

    /**
     * @return Factory|View
     */
    public function index()
    {
        $categories = $this->blogCategoryRepository->list();
        return $this->loadView('blogCategories.index', ['categories' => $categories]);
    }

    /**
     * @return Factory|View
     */
    public function create()
    {
        $categories = $this->blogCategoryRepository->all();
        return $this->loadView('blogCategories.create', ['categories' => $categories]);
    }

    /**
     * @param BlogCategory $category
     * @return Factory|View
     */
    public function edit(BlogCategory $category)
    {
        $categories = $this->blogCategoryRepository->all();
        return $this->loadView('blogCategories.edit', ['category' => $category, 'categories' => $categories]);
    }

    /**
     * @param BlogCategory $category
     * @return Factory|View
     */
    public function images(BlogCategory $category)
    {
        return $this->loadView('blogCategories.images', ['category' => $category]);
    }

    /**
     * @param UploadImagesRequest $request
     * @param BlogCategory $category
     * @return RedirectResponse
     */
    public function addImage(UploadImagesRequest $request, BlogCategory $category)
    {
        $this->blogCategoryRepository->pushImage($category, $request->all(), BlogCategoryModule::uploadDir());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Image has been added successfully'
        ]);
    }

    /**
     * @param CategoryRequest $request
     * @return RedirectResponse
     */
    public function store(CategoryRequest $request)
    {
        $this->blogCategoryRepository->create($request->getPayload(), Auth::id());

        return redirect(route(getRouteName(BlogCategoryModule::getModuleName(), 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Category has been created successfully'
        ]);
    }

    /**
     * @param CategoryRequest $request
     * @param BlogCategory $category
     * @return RedirectResponse
     */
    public function update(CategoryRequest $request, BlogCategory $category)
    {
        $this->blogCategoryRepository->update($category, $request->getPayload());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Category has been updated successfully'
        ]);
    }

    /**
     * @param BlogCategory $category
     * @return RedirectResponse
     */
    public function destroy(BlogCategory $category)
    {
        $this->blogCategoryRepository->delete($category);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Category has been deleted successfully'
        ]);
    }

    /**
     * @return RedirectResponse
     */
    public function massActions()
    {
        return BlogCategory::massActions();
    }

    /**
     * @param BlogCategory $category
     * @return JsonResponse
     */
    public function togglePublishedAjax(BlogCategory $category)
    {
        $updatedCategory = $this->blogCategoryRepository->toggle($category, 'published');

        return response()->json([
            'types' => 'success',
            'message' => 'Status has been updated successfully',
            'newStatus' => (bool)$updatedCategory->published
        ]);
    }

    /**
     * @param CategoryAjaxRequest $request
     * @param BlogCategory $category
     * @return array
     */
    public function updateSlugAjax(CategoryAjaxRequest $request, BlogCategory $category)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return [
            'message' => $validator->errors()->first(),
            'error' => true,
            'type' => 'error'
        ];

        $newSlug = $this->blogCategoryRepository->updateSlug($category, $request->all());

        return [
            'newSlug' => $newSlug,
            'message' => 'Slug has been updated successfully',
            'type' => 'success'
        ];
    }

    /**
     * @param UpdateImageAjaxRequest $request
     * @param BlogCategory $category
     * @return array
     */
    public function selectImageAjax(UpdateImageAjaxRequest $request, BlogCategory $category)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return response()->json([
            'message' => $validator->errors()->first(),
            'type' => 'error'
        ], 422);

        $this->blogCategoryRepository->markImageAsSelected($category, $request->getImageID());

        return [
            'message' => 'Image has been selected',
            'type' => 'success',
            'imageID' => (int) $request->getImageID()
        ];
    }

    /**
     * @param UpdateImageAjaxRequest $request
     * @param BlogCategory $category
     * @return array|JsonResponse
     */
    public function removeImageAjax(UpdateImageAjaxRequest $request, BlogCategory $category)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return response()->json([
            'message' => $validator->errors()->first(),
            'type' => 'error'
        ], 422);

        $this->blogCategoryRepository->removeImage($category, $request->getImageID());

        return [
            'message' => 'Image has been removed successfully',
            'type' => 'success',
            'imageID' => (int) $request->getImageID()
        ];
    }
}
