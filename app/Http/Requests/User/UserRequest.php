<?php

namespace App\Http\Requests\User;

use App\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;

class UserRequest extends FormRequest
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
        $user = $this->route('user');
        return [
            'email' => 'required|unique:users' .(isset($user) ? ',email,' . $user->id : null),
        ];
    }

    public function storeUser()
    {
        User::create([
            'first_name' => $this->input('first_name'),
            'last_name' => $this->input('last_name'),
            'email' => strtolower($this->input('email')),
            'password' => Hash::make($this->input('password')),
            'role_id' => (int)$this->input('role_id')
        ]);
    }

    public function updateUser(User $user)
    {
        $user->first_name = $this->input('first_name');
        $user->last_name = $this->input('last_name');
        $user->email = $this->input('email');
        $user->role_id = !!(int)$this->input('role_id') ? (int)$this->input('role_id') : null;
        $user->isDirty() ? $user->save() : null;
    }
}
