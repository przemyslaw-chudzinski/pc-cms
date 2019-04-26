<?php

namespace App\Http\Controllers\Admin;

use App\Core\Contracts\Repositories\SegmentRepository;
use App\Http\Requests\RemoveImageRequest;
use App\Http\Requests\Segment\SegmentRequest;
use App\Http\Requests\UpdateImageAjaxRequest;
use App\Http\Requests\UploadImagesRequest;
use App\Segment;
use Illuminate\Support\Facades\Auth;
use App\Facades\Segment as SegmentModule;

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
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $segments = $this->segmentRepository->list();
        return $this->loadView('segments.index', ['segments' => $segments]);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        return $this->loadView('segments.create');
    }

    /**
     * @param Segment $segment
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(Segment $segment)
    {
        return $this->loadView('segments.edit', ['segment' => $segment]);
    }

    /**
     * @param SegmentRequest $request
     * @return \Illuminate\Http\RedirectResponse
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
     * @return \Illuminate\Http\RedirectResponse
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
     * @return \Illuminate\Http\RedirectResponse
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function massActions()
    {
        return Segment::massActions();
    }

    /**
     * @param Segment $segment
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function images(Segment $segment)
    {
        return $this->loadView('segments.images', ['segment' => $segment]);
    }

    /**
     * @param UploadImagesRequest $request
     * @param Segment $segment
     * @return \Illuminate\Http\RedirectResponse
     */
    public function addImage(UploadImagesRequest $request, Segment $segment)
    {
        $this->segmentRepository->pushImage($segment, $request->all());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Image has been added successfully'
        ]);
    }

    /**
     * @param RemoveImageRequest $request
     * @param Segment $segment
     * @return \Illuminate\Http\RedirectResponse
     */
    public function removeImage(RemoveImageRequest $request, Segment $segment)
    {
        $this->segmentRepository->removeImage($segment, $request->all());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Image has been deleted successfully'
        ]);
    }

    /**
     * @param UpdateImageAjaxRequest $request
     * @param Segment $segment
     * @return array|\Illuminate\Http\JsonResponse
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
     * @return array|\Illuminate\Http\JsonResponse
     */
    public function removeImageAjax(UpdateImageAjaxRequest $request, Segment $segment)
    {
        $validator = $request->getValidatorInstance();

        if ($validator->fails()) return response()->json([
            'message' => $validator->errors()->first(),
            'type' => 'error'
        ], 422);

        $this->segmentRepository->removeImages($segment, $request->getImageID());

        return [
            'message' => 'Image has been removed',
            'type' => 'success',
            'imageID' => (int) $request->getImageID()
        ];
    }
}
