<?php


namespace App\Core\Modules;

use App\Core\Contracts\AsModule;
use App\Core\Contracts\WithFiles;

class BlogCategory implements AsModule, WithFiles
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
     * @return string
     */
    public function getModuleName(): string
    {
        return $this->moduleName;
    }

    /**
     * @return string
     */
    public function uploadDir()
    {
        return (string) getModuleUploadDir($this->moduleName);
    }
}
