<?php

namespace App\Core;

use Illuminate\Http\UploadedFile;
use Intervention\Image\Facades\Image as InterventionImage;

class Image extends File
{

    private $resizeQuality = 60;

    private $mode;

    public function __construct(UploadedFile $file, $uploadDirectoryName, $mode = 'fit', $disk = 'pc_public')
    {
        parent::__construct($file, $uploadDirectoryName, $disk);
        $this->mode = $mode;
    }

    private function createThumbnails()
    {
        $definedThumbnails = config('admin.thumbnails');
        $images = [];
        if (count($definedThumbnails) > 0) {
            foreach ($definedThumbnails as $definedThumbnail) {
                $path = $this->file->getRealPath();
                $img = InterventionImage::make($path);

                $thumbnailName = $definedThumbnail['name'].'_'.$this->file->getClientOriginalName();
                $thumbnailStoragePath = 'upload'.DIRECTORY_SEPARATOR.$this->uploadDirectoryName.DIRECTORY_SEPARATOR.$thumbnailName;
                $thumbnailPath =  public_path($thumbnailStoragePath);
                $images[$definedThumbnail['name']] = $this->uploadDirectoryName . '/'. $thumbnailName;

                $this->useMode($this->mode, $img, $thumbnailPath, $definedThumbnail);
            }
        }

        return $images;
    }

    private function useMode($mode, $img, $thumbnailPath, $definedThumbnail)
    {
        switch ($mode) {
            case 'fit':
                $this->fit($img, $thumbnailPath, (int)$definedThumbnail['width'], (int)$definedThumbnail['height']);
                break;
            case 'resize':
                $this->resize($img, $thumbnailPath, (int)$definedThumbnail['width'], (int)$definedThumbnail['height']);
                break;
            case 'crop':
                $this->crop($img, $thumbnailPath, (int)$definedThumbnail['width'], (int)$definedThumbnail['height'], null, null);
                break;
            default:
                $this->fit($img, $thumbnailPath, (int)$definedThumbnail['width'], (int)$definedThumbnail['height']);
                break;
        }
    }

    private function crop($img, $thumbnailPath, $width = null, $height = null, $x = null, $y = null)
    {
        $img->crop($width, $height, $x, $y)->save($thumbnailPath, $this->resizeQuality);
    }

    private function resize($img, $thumbnailPath, $width = null, $height = null)
    {
        if (!isset($width) || !isset($height)) {
            $img->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->save($thumbnailPath, $this->resizeQuality);
        } else {
            $img->resize($width, $height)->save($thumbnailPath, $this->resizeQuality);
        }
    }

    private function fit($img, $thumbnailPath, $width = null, $height = null)
    {
        $img->fit($width, $height, function ($constraint) {
            $constraint->upsize();
        })->save($thumbnailPath, $this->resizeQuality);
    }

    public function save()
    {
        parent::save();
        return $this->createThumbnails();
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
