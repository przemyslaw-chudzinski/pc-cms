<?php

namespace App;

use App\Traits\HasMassActions;
use App\Traits\ModelTrait;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class User extends Authenticatable
{
    use Notifiable, ModelTrait, HasMassActions;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role_id',
        'last_login',
        'IP',
        'USER_AGENT'
    ];

    protected static $sortable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role_id',
        'created_at',
        'updated_at'
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

    public static function updateLoggedUserSettings()
    {
        $data = request()->all();

        $validator = Validator::make($data, [
            'email' => [
                'required',
                Rule::unique('users')->ignore(Auth::user()->email, 'email')
            ]
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        Auth::user()->update($data);
    }

    public function updateUserAfterLogin()
    {
        $this->update([
            'last_login' => date("Y-m-d H:i:s", time()),
            'IP' => request()->server('REMOTE_ADDR'),
            'USER_AGENT' => request()->server('HTTP_USER_AGENT')
        ]);
    }

    public function updateUserRole()
    {
        $data = request()->all();

        $this->update([
            'role_id' => $data['role_id']
        ]);

        return back()->with('alert', [
            'type' => 'success',
            'message' => __('messages.item_updated_success')
        ]);
    }

    public static function getLastRegisteredUsers($limit = 5)
    {
        return self::where('id', '<>', Auth::id())->latest()->limit($limit)->get();
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
