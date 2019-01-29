<?php

namespace App\Core;

use App\Setting as SettingModel;

class Setting
{
    public function get($key = '', $default = null)
    {
        if ($key === '') return $default;
        $settingValue = SettingModel::where('key', $key)->get()->first();
        return isset($settingValue) ? $settingValue->value : $default;
    }
}
