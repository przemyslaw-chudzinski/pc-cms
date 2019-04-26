<?php

namespace App\Http\Requests\Role;

use App\Role;
use Illuminate\Foundation\Http\FormRequest;

class PermissionRequest extends FormRequest
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
        return [
            //
        ];
    }

//    public function updatePermissions(Role $role)
//    {
//        $role->permissions = $this->input('permissions');
//        $role->isDirty() ? $role->save() : null;
//        return $role;
//    }

    /**
     * @return array|string
     */
    public function getPayload()
    {
        return $this->input('permissions');
    }
}
