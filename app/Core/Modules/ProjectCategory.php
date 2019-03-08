<?php

namespace App\Core\Modules;

use App\Core\Contracts\AsModule;
use App\Core\Contracts\WithFiles;

/**
 * Class ProjectCategory
 * @package App\Core\Modules
 */
class ProjectCategory implements AsModule, WithFiles
{

    /**
     * @var
     */
    private $moduleName;

    public function __construct($moduleName)
    {
        $this->moduleName = $moduleName;
    }

    /**
     * @return \Illuminate\Config\Repository|mixed
     */
    public static function uploadDir()
    {
        return config('admin.modules.project_categories.upload_dir');
    }

    /**
     * @return string
     */
    public function getModuleName(): string
    {
        return $this->moduleName;
    }
}
