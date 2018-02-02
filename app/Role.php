<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;

class Role extends Model
{
    protected $fillable = ['name', 'display_name', 'description', 'permissions'];

    public static function getRolesWithPagination()
    {
        return self::paginate(10);
    }

    public static function getRoles()
    {
        return self::get();
    }

    public static function createNewRole()
    {
        $data = request()->all();

        $validator = Validator::make($data, [
            'name' => 'required|unique:roles'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        if (!isset($data['display_name'])) {
            $data['display_name'] = ucfirst($data['name']);
        }

        self::create($data);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Role has been created successfully'
        ]);
    }

    public function updateRole()
    {
        $data = request()->all();

        $data['name'] = strtolower($data['name']);

        $validator = Validator::make($data, [
            'name' => [
                'required',
                Rule::unique('roles')->ignore($this->name, 'name')
            ]
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }
        if (!isset($data['display_name'])) {
            $data['display_name'] = ucfirst($data['name']);
        }

        $this->update($data);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Role has been updated successfully'
        ]);
    }

    public function updatePermissions()
    {
        $data = request()->all();

        $this->update($data);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Permissions has been saved'
        ]);
    }
}
