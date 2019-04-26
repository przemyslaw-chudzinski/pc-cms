<?php


namespace App\Core\Modules;


use App\Core\Contracts\AsModule;

class Role implements AsModule
{
    /**
     * @var
     */
    protected $moduleName;

    public function __construct($moduleName)
    {
        $this->moduleName = $moduleName;
    }

    /**
     * @return string
     */
    public function getModuleName(): string
    {
        return 'roles';
    }
}
