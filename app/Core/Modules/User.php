<?php


namespace App\Core\Modules;


use App\Core\Contracts\AsModule;

class User implements AsModule
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
}
