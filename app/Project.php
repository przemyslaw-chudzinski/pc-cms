<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;
use App\Core\Services\Image;

class Project extends Model
{
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
        return self::paginate(10);
    }

    public static function createNewProject()
    {
        $data = request()->all();
        if (!isset($data['saveAndPublished'])) {
            $data['published'] = false;
        } else {
            $data['published'] = true;
        }
        if (!isset($data['slug']) || $data['slug'] === '' || empty($data['slug'])) {
            $data['slug'] = str_slug($data['title']);
        } else {
            $data['slug'] = str_slug($data['slug']);
        }
        if (!isset($data['allow_indexed'])) {
            $data['allow_indexed'] = false;
        } else {
            $data['allow_indexed'] = true;
        }
        $validator = Validator::make($data, [
            'title' => 'required',
            'slug' => 'unique:articles',
            'imageThumbnail' => 'image|max:2048'
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }
        if (request()->hasFile('imageThumbnail')) {
            $file = request()->file('imageThumbnail');
            $img = new Image($file, config('admin.modules.projects.upload_dir'));
            $img->upload();
            $data['thumbnail'] = $file->getClientOriginalName();
        }
        if (request()->hasFile('additionalImages')) {
            $files = request()->file('additionalImages');
            foreach ($files as $key => $file) {
                $img = new Image($file, config('admin.modules.projects.upload_dir'));
                $img->upload();
                $data['_images'][$key] = $file->getClientOriginalName();
            }
            $data['images'] = serialize($data['_images']);
        }
        $project = self::create($data);
        if (!empty($data['category_ids'])) {
            $project->categories()->sync($data['category_ids']);
        }
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Project has been created successfully'
        ]);
    }

    public function updateProject()
    {
        $data = request()->all();
        if (!isset($data['saveAndPublished'])) {
            $data['published'] = false;
        } else {
            $data['published'] = true;
        }
        if (!isset($data['slug']) || $data['slug'] === '' || empty($data['slug'])) {
            $data['slug'] = str_slug($data['title']);
        } else {
            $data['slug'] = str_slug($data['slug']);
        }
        if (!isset($data['allow_indexed'])) {
            $data['allow_indexed'] = false;
        } else {
            $data['allow_indexed'] = true;
        }
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
        if (request()->hasFile('imageThumbnail')) {
            $file = request()->file('imageThumbnail');
            $img = new Image($file, config('admin.modules.blog.upload_dir'));
            $img->upload();
            $data['thumbnail'] = $file->getClientOriginalName();
        }

        if (request()->hasFile('additionalImages')) {
            $files = request()->file('additionalImages');
            foreach ($files as $key => $file) {
                $img = new Image($file, config('admin.modules.projects.upload_dir'));
                $img->upload();
                $data['_images'][$key] = $file->getClientOriginalName();
            }
            $data['images'] = serialize($data['_images']);
        }

        if ($data['noImage'] === 'yes') {
            $data['thumbnail'] = '';
        }

        if ($data['noImages'] === 'yes') {
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
