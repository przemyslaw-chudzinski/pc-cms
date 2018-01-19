<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Segment;

class SegmentsController extends Controller
{
    public function index()
    {
        $segments = Segment::getSegmentsWithPagination();
        return view('admin.segments.index', ['segments' => $segments]);
    }

    public function create()
    {
        return view('admin.segments.create');
    }

    public function edit(Segment $segment)
    {
        return view('admin.segments.edit', ['segment' => $segment]);
    }

    public function store()
    {
        return Segment::createNewSegment();
    }

    public function update(Segment $segment)
    {

        $segment->updateSegment();

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Segment has been updated successfully'
        ]);
    }

    public function destroy(Segment $segment)
    {
        $segment->removeSegment();
        return back()->with('alert' , [
            'type' => 'success',
            'message' => 'Segment has been deleted successfully'
        ]);
    }
}
