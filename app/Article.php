<?php

namespace App;

use App\Core\Contracts\WithFiles;
use App\Traits\HasMassActions;
use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;
use App\Traits\HasFiles;

class Article extends Model implements WithFiles
{

    use ModelTrait, HasFiles, HasMassActions;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'published',
        'thumbnail',
        'allow_comments',
        'meta_title',
        'meta_description',
        'allow_indexed'
    ];

    protected static $sortable = [
        'title',
        'published',
        'allow_comments',
        'created_at',
        'updated_at'
    ];

    public function categories()
    {
        return $this->belongsToMany(BlogCategory::class, 'article_has_category', 'article_id', 'category_id')->withTimestamps();
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
            case 'change_comment_status_true':
                return self::massActionsChangeStatus($selected_ids, true, 'allow_comments');
            case 'change_comment_status_false':
                return self::massActionsChangeStatus($selected_ids, false, 'allow_comments');
        }
    }

    public static function uploadDir()
    {
        return config('admin.modules.blog.upload_dir');
    }
}
