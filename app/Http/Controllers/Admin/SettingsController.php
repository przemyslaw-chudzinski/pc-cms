<?php

namespace App\Http\Controllers\Admin;

use App\Core\Contracts\Repositories\SettingRepository;
use App\Http\Requests\Setting\SettingRequest;
use App\Setting;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class SettingsController extends BaseController
{
    /**
     * @var SettingRepository
     */
    private $settingRepository;

    public function __construct(SettingRepository $settingRepository)
    {
        $this->settingRepository = $settingRepository;
    }

    /**
     * @return Factory|View
     */
    public function index()
    {
        $settings = $this->settingRepository->all();
        return $this->loadView('settings.index', ['settings' => $settings]);
    }

    /**
     * @param SettingRequest $request
     * @return RedirectResponse
     */
    public function store(SettingRequest $request)
    {
        $this->settingRepository->create($request->all(), Auth::id());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Setting has been created successfully'
        ]);
    }

    /**
     * @param SettingRequest $request
     * @param Setting $setting
     * @return RedirectResponse
     */
    public function update(SettingRequest $request, Setting $setting)
    {
        $this->settingRepository->update($setting, $request->all());

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Setting has been updated successfully'
        ]);
    }

    /**
     * @param Setting $setting
     * @return RedirectResponse
     */
    public function destroy(Setting $setting)
    {
        $this->settingRepository->delete($setting);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Setting has been deleted successfully'
        ]);
    }
}
