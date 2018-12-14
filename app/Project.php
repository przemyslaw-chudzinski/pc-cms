<?php

namespace App;

use App\Core\Contracts\WithFiles;
use Illuminate\Database\Eloquent\Model;
use App\Core\Services\Image;
use App\Traits\ModelTrait;
use App\Traits\HasFiles;

class Project extends Model implements WithFiles
{

    use ModelTrait, HasFiles;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'published',
        'thumbnail',
        'images',
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

    public function removeImage()
    {
        $data = request()->all();

        $images = json_decode($this->images, true);

        foreach ($images as $key => $img) {
            if ($img['original'] === $data['image']) {
                unset($images[$key]);
                break;
            }
        }

        $this->update([
            'images' => json_encode($images)
        ]);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Image has been deleted successfully'
        ]);
    }

    public function addImage()
    {
        $data = request()->all();


        $validator = Validator::make($data, [
            'image' => 'image|required|max:2048'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $images = json_decode($this->images, true);

        if (!$images) {
            $images = [];
        }

        if (isset($data['image'])) {
            $images[] = self::uploadImage($data, 'image', getModuleUploadDir('projects'));
        }

        $this->update([
            'images' => json_encode($images)
        ]);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Image has been added successfully'
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
        return config('admin.modules.projects.upload_dir');
    }
}
