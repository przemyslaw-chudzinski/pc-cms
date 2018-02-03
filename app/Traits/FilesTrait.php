<?php

namespace App\Traits;

use App\Core\Services\Image;
use Illuminate\Support\Facades\Storage;

trait FilesTrait {

    /**
     * @param array $data
     * @param string $image
     * @param string $uploadDir
     * @return array
     */
    public static function uploadImage(array $data, string $image, string $uploadDir)
    {
        if (request()->hasFile($image)) {
            $file = request()->file($image);
            $img = new Image($file, $uploadDir);
            $images = $img->upload();
            return [
                'original' => $uploadDir . '/' . $file->getClientOriginalName(),
                'sizes' => $images
            ];
        }
    }

    public static function uploadImages(array $data, string $image, string $uploadDir)
    {
        $res = [];
        if (request()->hasFile($image)) {
            $files = request()->file($image);
            foreach ($files as $key => $file) {
                $img = new Image($file, $uploadDir);
                $images = $img->upload();
//                $data['_images'][$key] = $file->getClientOriginalName();
                $res[$key]['original'] = $uploadDir . '/' . $file->getClientOriginalName();
                $res[$key]['sizes'] = $images;
            }
            return $res;
        }
    }

}