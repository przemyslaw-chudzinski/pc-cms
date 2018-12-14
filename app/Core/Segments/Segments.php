<?php

namespace App\Core\Segments;


use App\Segment;

class Segments
{
    public function get($name)
    {
        $result = Segment::where('name', $name)->get();
        return $result && count($result) === 1 ? $result->first()->content : null;
    }
}