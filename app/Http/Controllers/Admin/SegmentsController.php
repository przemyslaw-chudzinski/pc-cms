<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Segment;

class SegmentsController extends Controller
{
    public function index()
    {
        $segments = Segment::getSegmentsWithPagination();
        return view('admin::segments.index', ['segments' => $segments]);
    }

    public function create()
    {
        return view('admin::segments.create');
    }

    public function edit(Segment $segment)
    {
        return view('admin::segments.edit', ['segment' => $segment]);
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
