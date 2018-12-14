<?php

namespace App;

use App\Core\Contracts\WithFiles;
use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;
use App\Traits\HasFiles;

class BlogCategory extends Model implements WithFiles
{

    use ModelTrait, HasFiles;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'published',
        'thumbnail',
        'parent_id'
    ];

    protected static $sortable = [
        'name',
        'published',
        'created_at',
        'updated_at'
    ];

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_has_category', 'category_id')->withTimestamps();
    }

    public function toggleStatusAjax()
    {
        $res = $this->toggleModelStatus('published');
        return response()->json([
            'types' => 'success',
            'message' => 'Status has been updated successfully',
            'newStatus' => $res['data']['published']
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
        return config('admin.modules.blog_categories.upload_dir');
    }
}
