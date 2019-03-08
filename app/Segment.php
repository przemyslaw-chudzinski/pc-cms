<?php

namespace App;

use App\Core\Contracts\Models\WithSort;
use App\Traits\HasMassActions;
use App\Traits\Models\Sortable;
use Illuminate\Database\Eloquent\Model;

class Segment extends Model implements WithSort
{
    use HasMassActions, Sortable;

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

    public function getImagesAttribute($images)
    {
        return json_decode($images);
    }

    public function setImagesAttribute($images)
    {
        $this->attributes['images'] = json_encode($images, true);
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
