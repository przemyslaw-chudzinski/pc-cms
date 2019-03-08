<?php

namespace App\Traits;

use App\Core\FilesService\File;
use App\Core\FilesService\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

/**
 * Trait HasFiles
 * @package App\Traits
 * @deprecated
 */
trait HasFiles {

    /**
     * @param $files
     * @param string $uploadDirName
     * @return false|string|null
     */
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

    /**
     * @param $storageFilePath
     * @return array
     */
    private function mapStoragePathToUrl($storageFilePath)
    {
        return [
            'path' => $storageFilePath,
            'url' => Storage::disk(config('admin.storage_disk'))->url($storageFilePath)
        ];
    }

    /**
     * @param string $columnName
     * @return array|mixed
     * @throws \Exception
     * @deprecated
     */
    public function getFilesFrom($columnName = 'image')
    {
        if (!isset($columnName)) throw new \Exception('You must specified columnName parameter');
        $images = $this->{$columnName};
//        return isset($imageJSON) ? json_decode($imageJSON, false) : [];
        return isset($images) ? $images : [];
    }

    /**
     * @param UploadedFile $file
     * @return bool
     */
    public function isImageType(UploadedFile $file)
    {
        $mimeType = $file->getMimeType();
        return (bool)preg_match('/image/', $mimeType);
    }

    /**
     * @param string $param
     * @param string $expectedValue
     * @return bool
     */
    public function canClearImage($param = 'noImage', $expectedValue = 'yes')
    {
        return $this->has($param) && $this->input($param) === $expectedValue;
    }

}
