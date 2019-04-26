<?php


namespace App\Core\Modules;


use App\Core\Contracts\AsModule;

class BlogCategory implements AsModule
{
    private $moduleName;

    public function __construct($moduleName)
    {
        $this->moduleName = $moduleName;
    }

    public function getModuleName(): string
    {
        return $this->moduleName;
    }
}
