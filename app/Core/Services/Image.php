<?php

namespace App\Core\Services;

use Intervention\Image\Facades\Image as InterventionImage;

class Image
{

    private $file;

    private $uploadDir;

    private $resizeQuality = 60;

    private $mode;

    public function __construct($file, $uploadDir, $mode = 'fit')
    {
        $this->file = $file;
        $this->uploadDir = $uploadDir;
        $this->mode = $mode;
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

                switch ($this->mode) {
                    case 'fit':
                        $this->fit($img, (int)$definedThumbnail['width'], (int)$definedThumbnail['height'], $images[$definedThumbnail['name']]);
                        break;
                    case 'resize':
                        $this->resize($img, (int)$definedThumbnail['width'], (int)$definedThumbnail['height'], $images[$definedThumbnail['name']]);
                        break;
                    case 'crop':
                        $this->crop($img, (int)$definedThumbnail['width'], (int)$definedThumbnail['height'], $images[$definedThumbnail['name']], null, null);
                        break;
                    default:
                        $this->fit($img, (int)$definedThumbnail['width'], (int)$definedThumbnail['height'], $images[$definedThumbnail['name']]);
                        break;
                }
            }
        }

        return $images;
    }

    private function crop($img, $width, $height, $fileName, $x = null, $y = null)
    {
        $img->crop($width, $height, $x, $y)->save('storage/' . $fileName, $this->resizeQuality);
    }

    private function resize($img, $width = null, $height = null, $fileName)
    {
        if (!isset($width) || !isset($height)) {
            $img->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->save('storage/' . $fileName, $this->resizeQuality);
        } else {
            $img->resize($width, $height)->save('storage/' . $fileName, $this->resizeQuality);
        }
    }

    private function fit($img, $width = null, $height = null, $fileName)
    {
        $img->fit($width, $height, function ($constraint) {
            $constraint->upsize();
        })->save('storage/' . $fileName, $this->resizeQuality);
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