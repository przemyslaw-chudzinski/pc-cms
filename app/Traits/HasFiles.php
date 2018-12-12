<?php

namespace App\Traits;

use App\Core\Image;
use Illuminate\Support\Facades\Storage;

trait HasFiles {

    protected function uploadFiles($files, string $uploadDirName)
    {
        $result = [];
        $uploadedFiles = [];
        if (!isset($files) || count($files) === 0)  {
            return null;
        }
        foreach ($files as $file) {
            $img = new Image($file, $uploadDirName);
            if ($img->isImageType()) {
                $sizes = $img->save();
                $result['sizes'] = array_map([$this, 'mapStoragePathToUrl'], $sizes);
            }
           $result['mime_type'] = $img->getOriginalFile()->getMimeType();
           $result['size'] = $img->getOriginalFile()->getSize();
           $result['file_name'] = $img->getOriginalFile()->getClientOriginalName();
           $result['extension'] = $img->getOriginalFile()->getClientOriginalExtension();
           $result['original'] = $this->mapStoragePathToUrl($uploadDirName . '/' . $img->getOriginalFile()->getClientOriginalName());
           array_push($uploadedFiles, $result);
        }
        return json_encode($uploadedFiles);
    }

    private function mapStoragePathToUrl($storageFilePath)
    {
        return [
            'path' => $storageFilePath,
            'url' => Storage::url($storageFilePath)
        ];
    }

    public function getFilesFrom($columnName = 'image')
    {
        if (!isset($columnName)) throw new \Exception('You must specified columnName parameter');
        $imageJSON = $this->{$columnName};
        return isset($imageJSON) ? json_decode($imageJSON, false) : [];
    }

}