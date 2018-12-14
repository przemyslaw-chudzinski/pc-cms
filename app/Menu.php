<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;

class Menu extends Model
{

    use ModelTrait;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'published'
    ];

    protected static $sortable = [
        'name',
        'published',
        'created_at',
        'updated_at'
    ];

    public function items()
    {
        return $this->hasMany(MenuItem::class, 'menu_id');
    }

    public function parentItems()
    {
        return $this->hasMany(MenuItem::class)->whereNull('parent_id');
    }

    public function getItems()
    {
        return $this
            ->parentItems()
            ->with('children')
            ->get();
    }

    public static function massActions()
    {
        $data = request()->all();
        $selected_ids = explode(',', $data['selected_values']);

        switch ($data['action_name']) {
            case 'delete':
                return self::massActionsDelete($selected_ids);
            case 'change_status_on_true':
                return self::massActionsChangeStatus($selected_ids,true);
            case 'change_status_on_false':
                return self::massActionsChangeStatus($selected_ids, false);
        }
    }
}
