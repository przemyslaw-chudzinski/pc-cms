<?php

namespace App\Traits\Repositories;

trait HasRemovableFiles
{
    /**
     * @param $filesObject
     * @param $fileID
     * @return array
     */
    protected function removeFile($filesObject, $fileID)
    {
        $filteredResult = [];
        foreach ($filesObject as $key => $file) {
            if ($file->_id !== $fileID) $filteredResult[] = $file;
        }
        return $filteredResult;
    }
}
