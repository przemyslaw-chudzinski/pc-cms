<?php

namespace App;

use App\Core\Contracts\Models\WithFiles;
use App\Traits\HasFiles;
use App\Traits\HasMassActions;
use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Segment extends Model implements WithFiles
{

    use ModelTrait, HasFiles, HasMassActions;

    protected $fillable = [
        'key',
        'description',
        'content',
        'image'
    ];

    protected static $sortable = [
        'key',
        'created_at',
        'updated_at'
    ];

    static function uploadDir()
    {
        $uploadDir = config('admin.modules.segments.upload_dir');
        return isset($uploadDir) ? $uploadDir : null;
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
