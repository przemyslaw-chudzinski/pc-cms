<?php

namespace App\Http\Controllers\Admin;

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

    public function store()
    {
        return Segment::createNewSegment();
    }

    public function update(Segment $segment)
    {
        return $segment->updateSegment();
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
