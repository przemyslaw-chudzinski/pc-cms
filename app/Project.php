<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;
use App\Core\Services\Image;
use App\Traits\ModelTrait;
use App\Traits\FilesTrait;

class Project extends Model
{

    use ModelTrait, FilesTrait;

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

    public static function getProjectsWithPagination()
    {
        return self::latest()->paginate(10);
    }

    public static function createNewProject()
    {
        $data = request()->all();

        $data['published'] = self::toggleValue($data, 'saveAndPublish');

        $data['slug'] = self::createSlug($data, 'title');

        $data['allow_indexed'] = self::toggleValue($data, 'allow_indexed');

        $validator = Validator::make($data, [
            'title' => 'required',
            'slug' => 'unique:articles',
            'imageThumbnail' => 'image|max:2048'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $data['thumbnail'] = self::uploadImage($data, 'imageThumbnail', getModuleUploadDir('projects'));

        $data['images'] = self::uploadImages($data, 'additionalImages', getModuleUploadDir('projects'));

        $project = self::create($data);

        if (!empty($data['category_ids'])) {
            $project->categories()->sync($data['category_ids']);
        }

        return redirect(route(getRouteName('projects', 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Project has been created successfully'
        ]);
    }

    public function updateProject()
    {
        $data = request()->all();

        $data['published'] = self::toggleValue($data, 'saveAndPublish');

        $data['slug'] = self::generateSlugBasedOn($data, 'title');

        $data['allow_indexed'] = self::toggleValue($data, 'allow_indexed');

        $validator = Validator::make($data, [
            'title' => 'required',
            'imageThumbnail' => 'image|max:2048',
            'images' => 'image| max:2048',
            'slug' => [
                'required',
                Rule::unique('projects')->ignore($this->slug, 'slug')
            ],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        if (isset($data['imageThumbnail'])) {
            $data['thumbnail'] = self::uploadImage($data, 'imageThumbnail', getModuleUploadDir('projects'));
        }

        if (isset($data['noImage']) && $data['noImage'] === 'yes') {
            $data['thumbnail'] = null;
        }

        if (isset($data['additionalImages'])) {
            $data['images'] = self::uploadImages($data, 'additionalImages', getModuleUploadDir('projects'));
        }


        if (isset($data['noImages']) && $data['noImages'] === 'yes') {
            $data['images'] = '';
        }

        $this->update($data);

        if (!empty($data['category_ids'])) {
            $this->categories()->sync($data['category_ids']);
        } else {
            $this->categories()->detach();
        }

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Project has been updated successfully'
        ]);

    }

    public function removeProject()
    {
        $this->delete();

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Project has been deleted successfully'
        ]);
    }

    private function toggleStatus()
    {
        $data['published'] = false;

        if (!$this->published) {
            $data['published'] = true;
        }

        $result = $this->update($data);

        return [
            'result' => $result,
            'data' => $data
        ];
    }

    public function toggleStatusAjax()
    {
        $res = $this->toggleStatus();

        return response()->json([
            'types' => 'success',
            'message' => 'Status has been updated successfully',
            'newStatus' => $res['data']['published']
        ]);
    }
}
