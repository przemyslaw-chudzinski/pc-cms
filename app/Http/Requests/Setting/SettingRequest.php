<?php

namespace App\Http\Requests\Setting;

use App\Setting;
use Illuminate\Foundation\Http\FormRequest;

class SettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $setting = $this->route('setting');
        return [
            'key' => 'required|unique:settings' . (isset($setting) ? ',key,' . $setting->id : null)
        ];
    }

    public function storeSetting()
    {
        Setting::create([
            'key' => $this->input('key'),
            'value' => $this->input('value'),
            'description' => $this->input('description'),
            'type' => $this->input('type')
        ]);
    }

    public function updateSetting(Setting $setting)
    {
        $value = $this->input('value');
        if ($setting->type === 'checkbox') {
            $setting->value = $this->has('value');
        } else {
            $setting->value = $value;
        }
        $setting->isDirty() ? $setting->save() : null;
        return $setting;
    }
}
