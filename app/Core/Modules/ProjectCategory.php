<?php

namespace App\Core\Modules;

use App\Core\Contracts\AsModule;
use App\Core\Contracts\WithFiles;
use Illuminate\Config\Repository;

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
     * @return Repository|mixed
     */
    public function uploadDir()
    {
        return getModuleUploadDir($this->moduleName);
    }

    /**
     * @return string
     */
    public function getModuleName(): string
    {
        return $this->moduleName;
    }
}
