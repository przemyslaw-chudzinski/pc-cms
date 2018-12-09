<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Segment\SegmentRequest;
use App\Segment;

class SegmentsController extends BaseController
{
    public function index()
    {
        $segments = Segment::getSegmentsWithPagination();
        return $this->loadView('segments.index', ['segments' => $segments]);
    }

    public function create()
    {
        return $this->loadView('segments.create');
    }

    public function edit(Segment $segment)
    {
        return $this->loadView('segments.edit', ['segment' => $segment]);
    }

    public function store(SegmentRequest $request)
    {
        $request->storeSegment();
        return redirect(route(getRouteName('segments', 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Segment has been created successfully'
        ]);
    }

    public function update(SegmentRequest $request, Segment $segment)
    {
        $request->updateSegment($segment);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Segment has been updated successfully'
        ]);
    }

    public function destroy(Segment $segment)
    {
        return $segment->removeSegment();
    }

    public function massActions()
    {
        return Segment::massActions();
    }
}
