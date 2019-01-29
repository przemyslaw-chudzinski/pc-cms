<?php

namespace App\Core;

use App\Segment as SegmentModel;

class Segment
{
    public function getContent($key = '', $default = null)
    {
        if ($key === '') return $default;
        $segment = $this->getSegmentByKey($key);
        return isset($segment) ? $segment->content : $default;
    }

    public function getDescription($key = '', $default = null)
    {
        if ($key === '') return $default;
        $segment = $this->getSegmentByKey($key);
        return isset($segment) ? $segment->description : $default;
    }

    public function exists($key = '')
    {
        if ($key === '') return false;
        $segment = $this->getSegmentByKey($key);
        return isset($segment);
    }

    public function getImage($key = '', $size = '', $default = null)
    {
        if ($key === '') return false;
        $segment = $this->getSegmentByKey($key);
        if (!isset($segment) || !isset($segment->image)) return $default;
        $image = json_decode($segment->image, false);
        return isset($image) && count($image) > 0 && isset($image[0]->sizes->{$size}) ? $image[0]->sizes->{$size}->url : $default;
    }

    protected function getSegmentByKey($key = '')
    {
        if ($key === '') return null;
        return SegmentModel::where('key', $key)->get()->first();
    }
}
