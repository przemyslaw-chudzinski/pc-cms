<?php

namespace App;

use App\Core\Contracts\WithFiles;
use App\Traits\HasFiles;
use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Segment extends Model implements WithFiles
{

    use ModelTrait, HasFiles;

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

    public static function getSegmentsWithPagination()
    {
        return self::getModelDataWithPagination();
    }

    public function removeSegment()
    {
        $this->delete();

        return back()->with('alert' , [
            'type' => 'success',
            'message' => 'Segment has been deleted successfully'
        ]);
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
