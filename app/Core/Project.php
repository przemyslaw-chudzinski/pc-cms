<?php

namespace App\Core;


use App\Core\Contracts\AsModule;
use App\Core\Contracts\Models\WithFiles;

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
     * @return \Illuminate\Config\Repository|mixed
     */
    public static function uploadDir()
    {
        return config('admin.modules.projects.upload_dir');
    }
}
