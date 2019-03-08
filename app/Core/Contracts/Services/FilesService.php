<?php

namespace App\Core\Contracts\Services;

use Illuminate\Http\UploadedFile;

interface FilesService
{
    function uploadFiles($files, string $uploadDirName);

    function getFilesFrom($columnName = 'image');

    function mapStoragePathToUrl($storageFilePath);

    function isImageType(UploadedFile $file);
}
