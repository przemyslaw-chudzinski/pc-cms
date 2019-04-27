<?php

namespace App\Http\Controllers\Admin;

use App\Core\Contracts\Repositories\ProjectRepository;
use App\Http\Requests\Project\ProjectAjaxRequest;
use App\Http\Requests\Project\ProjectRequest;
use App\Http\Requests\UpdateImageAjaxRequest;
use App\Http\Requests\UploadImagesRequest;
use App\Project;
use App\ProjectCategory;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use App\Facades\Project as ProjectFasade;
use Illuminate\View\View;

/**
 * Class ProjectsController
 * @package App\Http\Controllers\Admin
 */
class ProjectsController extends BaseController
{
    /**
     * @var ProjectRepository
     */
    private $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    /**
     * @return Factory|View
     */
    public function index()
    {
        $projects = $this->projectRepository->list();
        return $this->loadView('projects.index', ['projects' => $projects]);
    }

    /**
     * @return Factory|View
     */
    public function create()
    {
        $categories = ProjectCategory::get();
        return $this->loadView('projects.create', ['categories' => $categories]);
    }

    /**
     * @param Project $project
     * @return Factory|View
     */
    public function edit(Project $project)
    {
        $categories = ProjectCategory::get();
        return $this->loadView('projects.edit', ['project' => $project, 'categories' => $categories]);
    }

    /**
     * @param ProjectRequest $request
     * @return RedirectResponse
     */
    public function store(ProjectRequest $request)
    {
        $this->projectRepository->create($request->all(), Auth::id());

        return redirect(route(getRouteName(ProjectFasade::getModuleName(), 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Project has been created successfully'
        ]);
    }

    /**
     * @param ProjectRequest $request
     * @param Project $project
     * @return RedirectResponse
     */
    public function update(ProjectRequest $request, Project $project)
    {
        $this->projectRepository->update($project, $request->all());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Project has been updated successfully'
        ]);
    }

    /**
     * @param Project $project
     * @return RedirectResponse
     */
    public function destroy(Project $project)
    {
        $this->projectRepository->delete($project);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Project has been deleted successfully'
        ]);
    }

    /**
     * @param Project $project
     * @return Factory|View
     */
    public function images(Project $project)
    {
        return $this->loadView('projects.images', ['project' => $project]);
    }

    /**
     * @param UploadImagesRequest $request
     * @param Project $project
     * @return RedirectResponse
     */
    public function addImage(UploadImagesRequest $request, Project $project)
    {
        $this->projectRepository->pushImage($project, $request->all(), ProjectFasade::uploadDir());

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
        return Project::massActions();
    }

    /**
     * @param Project $project
     * @return JsonResponse
     */
    public function togglePublishedAjax(Project $project)
    {
        $updatedProject = $this->projectRepository->toggle($project, 'published');

        return response()->json([
            'types' => 'success',
            'message' => 'Status has been updated successfully',
            'newStatus' => (bool) $updatedProject->published
        ]);
    }

    /**
     * @param ProjectAjaxRequest $request
     * @param Project $project
     * @return array
     */
    public function updateSlugAjax(ProjectAjaxRequest $request, Project $project)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return [
            'message' => $validator->errors()->first(),
            'error' => true,
            'type' => 'error'
        ];

        $newSlug = $this->projectRepository->updateSlug($project, $request->all());

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

        $this->projectRepository->markImageAsSelected($project, $request->getImageID());

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

        $this->projectRepository->removeImage($project, $request->getImageID());

        return [
            'message' => 'Image has been removed successfully',
            'type' => 'success',
            'imageID' => (int) $request->getImageID()
        ];
    }
}
