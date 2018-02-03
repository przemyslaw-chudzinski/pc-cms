<?php

namespace App\Core\Services;

use Intervention\Image\Facades\Image as InterventionImage;

class Image
{

    private $file;

    private $uploadDir;

    private $resizeQuality = 60;

    public function __construct($file, $uploadDir)
    {
        $this->file = $file;
        $this->uploadDir = $uploadDir;
    }

    private function saveOriginalImage()
    {
        try {
            $this->file->move('storage/' . $this->uploadDir, $this->file->getClientOriginalName());
        } catch(Exception $e) {
            // TODO: Obsłużyć wyjątek
        }
    }

    private function makeOtherImages()
    {
        $definedThumbnails = config('admin.thumbnails');
        $images = [];
        if (count($definedThumbnails) > 0) {
            foreach ($definedThumbnails as $definedThumbnail) {
                $img = InterventionImage::make(public_path('storage/' . $this->uploadDir . '/' . $this->file->getClientOriginalName()));
                $images[$definedThumbnail['name']] = $this->uploadDir . '/' . time() . '_' . $definedThumbnail['name'] . '_' . $this->file->getClientOriginalName();
                $img->resize($definedThumbnail['width'], $definedThumbnail['height'])->save('storage/' . $images[$definedThumbnail['name']], $this->resizeQuality);
            }
        }

        return $images;
    }

    public function upload()
    {
        $this->saveOriginalImage();
        $res = $this->makeOtherImages();

        return $res;
    }

    public function setFile($file)
    {
        $this->file = $file;

        return $this;
    }

    public function getFile()
    {
        return $this->file;
    }

    public function setUploadDir($uploadDir)
    {
        $this->uploadDir = $uploadDir;

        return $this;
    }

    public function getUploadDir()
    {
        return $this->uploadDir;
    }


    public function setResizeQuality(int $resizeQuality)
    {
        $this->resizeQuality = $resizeQuality;
    }


    public function getResizeQuality(): int
    {
        return $this->resizeQuality;
    }

}