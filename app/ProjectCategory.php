<?php

namespace App;

use App\Core\Contracts\WithFiles;
use App\Traits\HasMassActions;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasFiles;
use App\Traits\ModelTrait;

class ProjectCategory extends Model implements WithFiles
{

    use HasFiles, ModelTrait, HasMassActions;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'published',
        'thumbnail'
    ];

    protected static $sortable = [
        'name',
        'published',
        'created_at',
        'updated_at'
    ];

    public function removeCategory()
    {
        $this->delete();

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Category has been updated successfully'
        ]);
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

    public static function uploadDir()
    {
        return config('admin.modules.project_categories.upload_dir');
    }
}
