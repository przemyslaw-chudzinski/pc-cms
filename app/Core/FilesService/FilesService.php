<?php

namespace App\Core\FilesService;

use App\Traits\FilesSupport;
use App\Core\Contracts\Services\FilesService as FileServiceContract;

/**
 * Class FilesService
 * @package App\Core\Files
 */
class FilesService implements FileServiceContract
{
    use FilesSupport;
}
