<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Validation\Rule;
use Validator;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public static function getUsersWithPagination()
    {
        return self::with('role')->paginate(10);
    }

    public static function createNewUser()
    {
        $data = request()->all();
        $data['name'] = trim($data['name']);
        $data['email'] = trim($data['email']);
        $validator = Validator::make($data, [
           'name' => 'required',
           'email' => 'required|unique:users',
           'password' => 'required|min:6',
           'role_id'  => 'required'
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }
        $data['password'] = trim($data['password']);
        $data['password'] = Hash::make($data['password']);
        self::create($data);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'User has been created successfully'
        ]);
    }

    public function updateUser()
    {
        $data = request()->all();
        $data['name'] = trim($data['name']);
        $data['email'] = trim($data['email']);
        $validator = Validator::make($data, [
            'name' => 'required',
            'email' => [
                'required',
                Rule::unique('users')->ignore($this->email, 'email')
            ],
            'role_id' => 'required'
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }
        $this->update($data);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'User has been updated successfully'
        ]);
    }
}
