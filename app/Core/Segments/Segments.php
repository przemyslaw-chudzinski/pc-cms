<?php

namespace App\Core\Segments;


use App\Segment;

class Segments
{
    public function get($name = '')
    {
        if ($name === '') {
            return null;
        }
        $result = Segment::where('name', $name)->get();
        if ($result && count($result) === 1) {
            return $result->first()->content;
        }
        return null;
    }
}