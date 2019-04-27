<?php

namespace App\Http\Controllers\Admin;

use App\Core\Contracts\Repositories\SegmentRepository;
use App\Http\Requests\Segment\SegmentRequest;
use App\Http\Requests\UpdateImageAjaxRequest;
use App\Http\Requests\UploadImagesRequest;
use App\Segment;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use App\Facades\Segment as SegmentModule;
use Illuminate\View\View;

class SegmentsController extends BaseController
{
    /**
     * @var SegmentRepository
     */
    private $segmentRepository;

    public function __construct(SegmentRepository $segmentRepository)
    {
        $this->segmentRepository = $segmentRepository;
    }

    /**
     * @return Factory|View
     */
    public function index()
    {
        $segments = $this->segmentRepository->list();
        return $this->loadView('segments.index', ['segments' => $segments]);
    }

    /**
     * @return Factory|View
     */
    public function create()
    {
        return $this->loadView('segments.create');
    }

    /**
     * @param Segment $segment
     * @return Factory|View
     */
    public function edit(Segment $segment)
    {
        return $this->loadView('segments.edit', ['segment' => $segment]);
    }

    /**
     * @param SegmentRequest $request
     * @return RedirectResponse
     */
    public function store(SegmentRequest $request)
    {
        $this->segmentRepository->create($request->all(), Auth::id());

        return redirect(route(getRouteName(SegmentModule::getModuleName(), 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Segment has been created successfully'
        ]);
    }

    /**
     * @param SegmentRequest $request
     * @param Segment $segment
     * @return RedirectResponse
     */
    public function update(SegmentRequest $request, Segment $segment)
    {
        $this->segmentRepository->update($segment, $request->all());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Segment has been updated successfully'
        ]);
    }

    /**
     * @param Segment $segment
     * @return RedirectResponse
     */
    public function destroy(Segment $segment)
    {
        $this->segmentRepository->delete($segment);

        return back()->with('alert' , [
            'type' => 'success',
            'message' => 'Segment has been deleted successfully'
        ]);
    }

    /**
     * @return RedirectResponse
     */
    public function massActions()
    {
        return Segment::massActions();
    }

    /**
     * @param Segment $segment
     * @return Factory|View
     */
    public function images(Segment $segment)
    {
        return $this->loadView('segments.images', ['segment' => $segment]);
    }

    /**
     * @param UploadImagesRequest $request
     * @param Segment $segment
     * @return RedirectResponse
     */
    public function addImage(UploadImagesRequest $request, Segment $segment)
    {
        $this->segmentRepository->pushImage($segment, $request->all(), SegmentModule::uploadDir());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Image has been added successfully'
        ]);
    }

    /**
     * @param UpdateImageAjaxRequest $request
     * @param Segment $segment
     * @return array|JsonResponse
     */
    public function selectImageAjax(UpdateImageAjaxRequest $request, Segment $segment)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return response()->json([
            'message' => $validator->errors()->first(),
            'type' => 'error'
        ], 422);

        $this->segmentRepository->markImageAsSelected($segment, $request->getImageID());

        return [
            'message' => 'Image has been selected',
            'type' => 'success',
            'imageID' => (int) $request->getImageID()
        ];
    }

    /**
     * @param UpdateImageAjaxRequest $request
     * @param Segment $segment
     * @return array|JsonResponse
     */
    public function removeImageAjax(UpdateImageAjaxRequest $request, Segment $segment)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return response()->json([
            'message' => $validator->errors()->first(),
            'type' => 'error'
        ], 422);

        $this->segmentRepository->removeImage($segment, $request->getImageID());

        return [
            'message' => 'Image has been removed',
            'type' => 'success',
            'imageID' => (int) $request->getImageID()
        ];
    }
}
