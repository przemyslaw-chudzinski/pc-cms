<?php

namespace App;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

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
