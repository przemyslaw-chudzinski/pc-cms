<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Setting;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Setting::getAllSettings();
        return view('admin::settings.index', ['settings' => $settings]);
    }

    public function store()
    {
        return Setting::createSetting();
    }

    public function update(Setting $setting)
    {
        return $setting->updateSetting();
    }

    public function destroy(Setting $setting)
    {
        return $setting->removeSetting();
    }
}
