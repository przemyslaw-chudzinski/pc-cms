<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Validation\Rule;
use Validator;
use Illuminate\Support\Facades\Hash;
use Auth;

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

        $validator = Validator::make($data, [
           'name' => 'required',
           'email' => 'required|unique:users',
           'password' => 'required|min:6',
           'role_id'  => 'required'
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

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

    public function removeUser()
    {
        $this->delete();

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'User has been deleted successfully'
        ]);
    }

    public function resetPassword()
    {
        $data = request()->all();

        $validator = Validator::make($data, [
            'password' => 'required|min:6',
            'repeatedPassword' => 'required'
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        if ($data['password'] !== $data['repeatedPassword']) {
            return back()->with('alert', [
                'type' => 'danger',
                'message' => 'Passwords must be the same'
            ]);
        }

        $this->update(['password' => Hash::make($data['password'])]);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Password has been updated successfully'
        ]);
    }

    public static function updateLoggedUserSettings()
    {
        $data = request()->all();

        $validator = Validator::make($data, [
            'name' => 'required',
            'email' => [
                'required',
                Rule::unique('users')->ignore(Auth::user()->email, 'email')
            ],
            'role_id' => 'required'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        Auth::user()->update($data);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Settings has been updated successfully'
        ]);
    }
}
