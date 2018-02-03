<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Validator;
use App\Traits\ModelTrait;

class Setting extends Model
{

    use ModelTrait;

    protected $fillable = [
        'key',
        'value',
        'type',
        'position',
        'description'
    ];

    public static function createSetting()
    {
        $data = request()->all();

        $data['key'] = str_slug($data['key']);

        $validator = Validator::make($data, [
            'key' => 'required|unique:settings'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        self::create($data);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Setting has been created successfully'
        ]);
    }

    public static function getAllSettings()
    {
        return self::get();
    }

    public function removeSetting()
    {
        $this->delete();

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Setting has been deleted successfully'
        ]);
    }

    public function updateSetting()
    {
        $data = request()->all();

        if ($data['field_type'] === 'checkbox') {
            $data['value'] = self::toggleValue($data, 'value');
        }

        $this->update($data);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Setting has been updated successfully'
        ]);

    }

}
