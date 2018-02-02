<?php

namespace App\Traits;

use App\Core\Services\Image;

trait FilesTrait {

    /**
     * @param array $data
     * @param string $image
     * @param string $uploadDir
     * @return null|string
     */
    public static function uploadImage(array $data, string $image, string $uploadDir)
    {
        if (request()->hasFile($image)) {
            $file = request()->file($image);
            $img = new Image($file, $uploadDir);
            $img->upload();
            return $file->getClientOriginalName();
        }
    }

    public static function uploadImages(array $data, string $image, string $uploadDir)
    {
        if (request()->hasFile($image)) {
            $files = request()->file($image);
            foreach ($files as $key => $file) {
                $img = new Image($file, $uploadDir);
                $img->upload();
                $data['_images'][$key] = $file->getClientOriginalName();
            }
            return serialize($data['_images']);
        }
    }

}