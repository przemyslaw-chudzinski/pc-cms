<?php


namespace App\Traits\Repositories;


trait HasSelectableFiles
{
    protected function markFileAsSelected($filesObject, $fileID, $multiple = false)
    {
        foreach ($filesObject as $file) {
            if ((int) $file->_id === $fileID) $file->selected = true;
            elseif (!$multiple) $file->selected = false;
        }
        return $filesObject;
    }
}
