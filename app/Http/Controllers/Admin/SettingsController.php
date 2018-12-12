<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Setting\SettingRequest;
use App\Setting;

class SettingsController extends BaseController
{
    public function index()
    {
        $settings = Setting::get();
        return $this->loadView('settings.index', ['settings' => $settings]);
    }

    public function store(SettingRequest $request)
    {
        $request->storeSetting();
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Setting has been created successfully'
        ]);
    }

    public function update(SettingRequest $request, Setting $setting)
    {
        $request->updateSetting($setting);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Setting has been updated successfully'
        ]);
    }

    public function destroy(Setting $setting)
    {
        $setting->delete();
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Setting has been deleted successfully'
        ]);
    }
}
