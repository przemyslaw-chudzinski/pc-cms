<?php

namespace App;

use App\Core\Contracts\Models\WithSort;
use App\Traits\HasMassActions;
use App\Traits\Models\HasImages;
use App\Traits\Models\Sortable;
use Illuminate\Database\Eloquent\Model;

class Project extends Model implements WithSort
{
    use HasMassActions, Sortable, HasImages;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'published',
        'images',
        'allow_indexed',
        'meta_title',
        'meta_description',
        'author_ID'
    ];

    protected $casts = [
        'author_ID' => 'integer'
    ];

    protected $sortable = [
        'title',
        'published',
        'created_at',
        'updated_at'
    ];

    public function categories()
    {
        return $this
            ->belongsToMany(ProjectCategory::class, 'project_has_category','project_id', 'category_id')
            ->withTimestamps();
    }

    public function getCategoryIdsAttribute()
    {
        return $this->categories->pluck('id')->all();
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
