<?php

namespace App\Traits;

use App\Core\File;
use App\Core\Image;
use Illuminate\Http\UploadedFile;
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
            $f = null;
            if ($this->isImageType($file)) {
                $f = new Image($file, $uploadDirName);
                $sizes = $f->save();
                $result['sizes'] = array_map([$this, 'mapStoragePathToUrl'], $sizes);
            } else {
                $f = new File($file, $uploadDirName);
                $f->save();
            }
           $result['mime_type'] = $f->getOriginalFile()->getMimeType();
           $result['size'] = $f->getOriginalFile()->getSize();
           $result['file_name'] = $f->getOriginalFile()->getClientOriginalName();
           $result['extension'] = $f->getOriginalFile()->getClientOriginalExtension();
           $result['original'] = $this->mapStoragePathToUrl($uploadDirName . '/' . $f->getOriginalFile()->getClientOriginalName());
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

    public function isImageType(UploadedFile $file)
    {
        $mimeType = $file->getMimeType();
        return (bool)preg_match('/image/', $mimeType);
    }

}