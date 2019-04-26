<?php

namespace App\Http\Requests\Role;

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

    /**
     * @return array
     */
    public function getPayload()
    {
        $name = $this->input('name');
        $displayName = $this->input('display_name');

        return  [
            'name' => $name,
            'display_name' => isset($displayName) ? ucfirst($displayName) : ucfirst($name),
            'description' => $this->input('description')
        ];
    }
}
