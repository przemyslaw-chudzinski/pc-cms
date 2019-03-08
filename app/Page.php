<?php

namespace App;

use App\Core\Contracts\Models\WithFiles;
use App\Traits\HasMassActions;
use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;
use App\Traits\HasFiles;

class Page extends Model implements WithFiles
{

    use ModelTrait, HasFiles, HasMassActions;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'published',
        'thumbnail',
        'allow_indexed',
        'meta_title',
        'meta_description'
    ];

    protected static $sortable = [
        'title',
        'published',
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
            case 'change_status_on_true':
                return self::massActionsChangeStatus($selected_ids,true);
            case 'change_status_on_false':
                return self::massActionsChangeStatus($selected_ids, false);
        }
    }

    public static function uploadDir()
    {
        return config('admin.modules.pages.upload_dir');
    }
}
