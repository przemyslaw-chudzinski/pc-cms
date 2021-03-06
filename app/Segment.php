<?php

namespace App;

use App\Core\Contracts\Models\WithSort;
use App\Traits\HasMassActions;
use App\Traits\Models\HasImages;
use App\Traits\Models\Sortable;
use Illuminate\Database\Eloquent\Model;

class Segment extends Model implements WithSort
{
    use HasMassActions, Sortable, HasImages;

    protected $fillable = [
        'key',
        'description',
        'content',
        'images',
        'author_ID'
    ];

    protected $sortable = [
        'key',
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
