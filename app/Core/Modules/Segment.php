<?php

namespace App\Core\Modules;

use App\Core\Contracts\AsModule;
use App\Core\Contracts\WithFiles;
use App\Segment as SegmentModel;

class Segment implements AsModule, WithFiles
{
    /**
     * @var
     */
    private $moduleName;

    public function __construct($moduleName)
    {
        $this->moduleName = $moduleName;
    }

    /**
     * @param string $key
     * @param null $default
     * @return |null
     */
    public function getContent($key = '', $default = null)
    {
        if ($key === '') return $default;
        $segment = $this->getSegmentByKey($key);
        return isset($segment) ? $segment->content : $default;
    }

    /**
     * @param string $key
     * @param null $default
     * @return |null
     */
    public function getDescription($key = '', $default = null)
    {
        if ($key === '') return $default;
        $segment = $this->getSegmentByKey($key);
        return isset($segment) ? $segment->description : $default;
    }

    /**
     * @param string $key
     * @return bool
     */
    public function exists($key = '')
    {
        if ($key === '') return false;
        $segment = $this->getSegmentByKey($key);
        return isset($segment);
    }

    /**
     * @param string $key
     * @param string $size
     * @param null $default
     * @return bool|null
     */
    public function getImage($key = '', $size = '', $default = null)
    {
        if ($key === '') return false;
        $segment = $this->getSegmentByKey($key);
        if (!isset($segment) || !isset($segment->image)) return $default;
        $image = json_decode($segment->image, false);
        return isset($image) && count($image) > 0 && isset($image[0]->sizes->{$size}) ? $image[0]->sizes->{$size}->url : $default;
    }

    /**
     * @param string $key
     * @return |null
     */
    protected function getSegmentByKey($key = '')
    {
        if ($key === '') return null;
        return SegmentModel::where('key', $key)->get()->first();
    }

    /**
     * @return string
     */
    public function getModuleName(): string
    {
        return $this->moduleName;
    }

    /**
     * @return \Illuminate\Config\Repository|mixed
     */
    public static function uploadDir()
    {
        return config('admin.modules.segments.upload_dir');
    }
}
