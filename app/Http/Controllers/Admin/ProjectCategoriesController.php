<?php

namespace App\Http\Controllers\Admin;

use App\Core\Contracts\Repositories\ProjectCategoryRepository;
use App\Http\Requests\ProjectCategory\CategoryAjaxRequest;
use App\Http\Requests\ProjectCategory\CategoryRequest;
use App\Http\Requests\UpdateImageAjaxRequest;
use App\ProjectCategory;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use App\Facades\ProjectCategory as ProjectCategoryModule;
use Illuminate\View\View;

class ProjectCategoriesController extends BaseController
{
    /**
     * @var ProjectCategoryRepository
     */
    private $projectCategoryRepository;

    public function __construct(ProjectCategoryRepository $projectCategoryRepository)
    {
        $this->projectCategoryRepository = $projectCategoryRepository;
    }

    /**
     * @return Factory|View
     */
    public function index()
    {
        $categories = $this->projectCategoryRepository->list();
        return $this->loadView('projectCategories.index', ['categories' => $categories]);
    }

    /**
     * @return Factory|View
     */
    public function create()
    {
        return $this->loadView('projectCategories.create');
    }

    /**
     * @param ProjectCategory $projectCategory
     * @return Factory|View
     */
    public function images(ProjectCategory $projectCategory)
    {
        return $this->loadView('projectCategories.images', ['category' => $projectCategory]);
    }

    /**
     * @param CategoryRequest $request
     * @return RedirectResponse
     */
    public function store(CategoryRequest $request)
    {
        $this->projectCategoryRepository->create($request->all(), Auth::id());

        return redirect(route(getRouteName(ProjectCategoryModule::getModuleName(), 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Category has been created successfully'
        ]);
    }

    /**
     * @param ProjectCategory $projectCategory
     * @return Factory|View
     */
    public function edit(ProjectCategory $projectCategory)
    {
        return $this->loadView('projectCategories.edit', ['category' => $projectCategory]);
    }

    /**
     * @param CategoryRequest $request
     * @param ProjectCategory $projectCategory
     * @return RedirectResponse
     */
    public function update(CategoryRequest $request, ProjectCategory $projectCategory)
    {
        $this->projectCategoryRepository->update($projectCategory, $request->all());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Category has been updated successfully'
        ]);
    }

    /**
     * @param ProjectCategory $projectCategory
     * @return RedirectResponse
     */
    public function destroy(ProjectCategory $projectCategory)
    {
        $this->projectCategoryRepository->delete($projectCategory);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Category has been updated successfully'
        ]);
    }

    /**
     * @return RedirectResponse
     */
    public function massActions()
    {
        return ProjectCategory::massActions();
    }

    /**
     * @param ProjectCategory $projectCategory
     * @return RedirectResponse
     */
    public function addImage(ProjectCategory $projectCategory)
    {
        $this->projectCategoryRepository->pushImage($projectCategory, request()->all(), ProjectCategoryModule::uploadDir());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Image has been added successfully'
        ]);
    }

    /**
     * @param ProjectCategory $category
     * @return JsonResponse
     */
    public function togglePublishedAjax(ProjectCategory $category)
    {
        $updatedCategory = $this->projectCategoryRepository->toggle($category, 'published');

        return response()->json([
            'types' => 'success',
            'message' => 'Status has been updated successfully',
            'newStatus' => (bool) $updatedCategory->published
        ]);
    }

    /**
     * @param CategoryAjaxRequest $request
     * @param ProjectCategory $category
     * @return array
     */
    public function updateSlugAjax(CategoryAjaxRequest $request, ProjectCategory $category)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return [
            'message' => $validator->errors()->first(),
            'error' => true,
            'type' => 'error'
        ];

        $newSlug = $this->projectCategoryRepository->updateSlug($category, $request->all());

        return [
            'newSlug' => $newSlug,
            'message' => 'Slug has been updated successfully',
            'type' => 'success'
        ];
    }

    /**
     * @param UpdateImageAjaxRequest $request
     * @param ProjectCategory $category
     * @return array|JsonResponse
     */
    public function selectImageAjax(UpdateImageAjaxRequest $request, ProjectCategory $category)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return response()->json([
            'message' => $validator->errors()->first(),
            'type' => 'error'
        ], 422);

        $this->projectCategoryRepository->markImageAsSelected($category, $request->getImageID());

        return [
            'message' => 'Image has been selected',
            'type' => 'success',
            'imageID' => (int) request()->input('imageID')
        ];
    }

    /**
     * @param UpdateImageAjaxRequest $request
     * @param ProjectCategory $category
     * @return array|JsonResponse
     */
    public function removeImageAjax(UpdateImageAjaxRequest $request, ProjectCategory $category)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return response()->json([
            'message' => $validator->errors()->first(),
            'type' => 'error'
        ], 422);

        $this->projectCategoryRepository->removeImage($category, $request->getImageID());

        return [
            'message' => 'Image has been deleted successfully',
            'type' => 'success'
        ];
    }
}
