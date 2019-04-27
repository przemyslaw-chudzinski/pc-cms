<?php

namespace App\Core\Modules;


use App\Core\Contracts\AsModule;
use App\Core\Contracts\WithFiles;
use Illuminate\Config\Repository;

/**
 * Class Project
 * @package App\Core
 */
class Project implements AsModule, WithFiles
{
    /**
     * @var
     */
    private $module_name;

    public function __construct($module_name)
    {
        $this->module_name = $module_name;
    }

    /**
     * @return string
     */
    public function getModuleName(): string
    {
        return $this->module_name;
    }

    /**
     * @return string
     */
    public function uploadDir()
    {
        return getModuleUploadDir($this->module_name);
    }
}
