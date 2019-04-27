<?php

namespace App\Core\Modules;

use App\Core\Contracts\AsModule;
use App\Setting as SettingModel;

class Setting implements AsModule
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

    public function get($key = '', $default = null)
    {
        if ($key === '') return $default;
        $settingValue = SettingModel::where('key', $key)->get()->first();
        return isset($settingValue) ? $settingValue->value : $default;
    }
}
