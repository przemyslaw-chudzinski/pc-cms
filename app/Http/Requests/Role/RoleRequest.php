<?php

namespace App\Http\Requests\Role;

use App\Role;
use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
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
        $role = $this->route('role');
        return [
            'name' => 'max:255|required|unique:roles'. (isset($role) ? ',name,'. $role->id : null)
        ];
    }

    public function storeRole()
    {
        $name = $this->input('name');
        $displayName = $this->input('display_name');
        Role::create([
            'name' => $name,
            'display_name' => isset($displayName) ? ucfirst($displayName) : ucfirst($name),
            'description' => $this->input('description')
        ]);
    }

    public function updateRole(Role $role)
    {
        $name = $this->input('name');
        $displayName = $this->input('display_name');
        $role->name = $name;
        $role->display_name = isset($displayName) ? ucfirst($displayName) : ucfirst($name);
        $role->description = $this->input('description');
        $role->isDirty() ? $role->save() : null;
        return $role;
    }
}
