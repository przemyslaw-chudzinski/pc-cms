<?php

namespace App;

use App\Core\Contracts\Models\WithSort;
use App\Traits\HasMassActions;
use App\Traits\Models\HasImages;
use App\Traits\Models\Sortable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;

class ProjectCategory extends Model implements WithSort
{
    use  HasMassActions, Sortable, HasImages;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'published',
        'images'
    ];

    protected $casts = [
        'author_ID' => 'integer'
    ];

    protected $sortable = [
        'name',
        'published',
        'created_at',
        'updated_at'
    ];

    /**
     * @return RedirectResponse
     */
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
