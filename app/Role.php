<?php

namespace App;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;

class Role extends Model
{

    use ModelTrait;

    protected $fillable = [
        'name',
        'display_name',
        'description',
        'permissions',
        'allow_remove'
    ];

    protected static $sortable = [
        'name',
        'created_at',
        'updated_at'
    ];

    public static function getRolesWithPagination()
    {
        return self::getModelDataWithPagination();
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

        return redirect(route(getRouteName('roles', 'index')))->with('alert', [
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

    public function removeRole()
    {
        if ($this->allow_remove) {

            $this->delete();

            return back()->with('alert', [
                'type' => 'success',
                'message' => 'Role has been deleted successfully'
            ]);
        }

        return back();
    }

    public static function massActions()
    {
        $data = request()->all();
        $selected_ids = explode(',', $data['selected_values']);

        switch ($data['action_name']) {
            case 'delete':
                return self::massActionsDelete($selected_ids);
        }
    }
}
