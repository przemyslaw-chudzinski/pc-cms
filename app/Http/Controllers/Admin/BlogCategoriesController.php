<?php

namespace App\Http\Controllers\Admin;

use App\BlogCategory;
use App\Core\Contracts\Repositories\BlogCategoryRepository;
use App\Http\Requests\Blog\CategoryAjaxRequest;
use App\Http\Requests\Blog\CategoryRequest;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

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
     * @param BlogCategory $blogCategory
     * @return Factory|View
     */
    public function edit(BlogCategory $blogCategory)
    {
        $categories = $this->blogCategoryRepository->all();
        return $this->loadView('blogCategories.edit', ['category' => $blogCategory, 'categories' => $categories]);
    }

    public function store(CategoryRequest $request)
    {
        $request->storeCategory();
        return redirect(route(getRouteName('blog_categories', 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Category has been created successfully'
        ]);
    }

    public function update(CategoryRequest $request, BlogCategory $blogCategory)
    {
        $request->updateCategory($blogCategory);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Category has been updated successfully'
        ]);
    }

    /**
     * @param BlogCategory $blogCategory
     * @return RedirectResponse
     */
    public function destroy(BlogCategory $blogCategory)
    {
        $this->blogCategoryRepository->delete($blogCategory);

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

    public function togglePublishedAjax(CategoryAjaxRequest $request, BlogCategory $category)
    {
        $updatedCategory = $request->toggle($category, 'published');
        return response()->json([
            'types' => 'success',
            'message' => 'Status has been updated successfully',
            'newStatus' => (bool)$updatedCategory->published
        ]);
    }

    public function updateSlugAjax(CategoryAjaxRequest $request, BlogCategory $category)
    {
        $newSlug = $request->updateSlug($category);
        if (is_array($newSlug)) return $newSlug;
        return [
            'newSlug' => $newSlug,
            'message' => 'Slug has been updated successfully',
            'type' => 'success'
        ];
    }
}
