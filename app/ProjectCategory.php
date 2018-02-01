<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;
use App\Core\Services\Image;

class ProjectCategory extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'published', 'thumbnail'];

    public static function getCategoriesWithPagination()
    {
        return self::paginate(10);
    }

    public static function getCategories()
    {
        return self::get();
    }

    public static function createNewCategory()
    {
        $data = request()->all();
        if (!isset($data['saveAndPublish'])) {
            $data['published'] = false;
        } else {
            $data['published'] = true;
        }
        if (!isset($data['slug']) || $data['slug'] === '' || empty($data['slug'])) {
            $data['slug'] = str_slug($data['name']);
        } else {
            $data['slug'] = str_slug($data['slug']);
        }
        $validator = Validator::make($data, [
            'name' => 'required',
            'slug' => 'unique:project_categories',
            'imageThumbnail' => 'image|max:2048'
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }
        if (request()->hasFile('imageThumbnail')) {
            $file = request()->file('imageThumbnail');
            $img = new Image($file, config('admin.modules.project_categories.upload_dir'));
            $img->upload();
            $data['thumbnail'] = $file->getClientOriginalName();
        }
        self::create($data);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Category has been created successfully'
        ]);
    }

    public function updateCategory()
    {
        $data = request()->all();
        if (!isset($data['saveAndPublish'])) {
            $data['published'] = false;
        } else {
            $data['published'] = true;
        }
        if (isset($data['generateSlug'])) {
            $data['slug'] = str_slug($data['name']);
        } else {
            if (!isset($data['slug'])) {
                $data['slug'] = str_slug($data['name']);
            } else {
                $data['slug'] = str_slug($data['slug']);
            }
        }
        $validator = Validator::make($data, [
            'name' => 'required',
            'slug' => [
                'required',
                Rule::unique('project_categories')->ignore($this->slug, 'slug')
            ],
            'imageThumbnail' => 'image|max:2048'
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }
        if (request()->hasFile('imageThumbnail')) {
            $file = request()->file('imageThumbnail');
            $img = new Image($file, config('admin.modules.project_categories.upload_dir'));
            $img->upload();
            $data['thumbnail'] = $file->getClientOriginalName();
        }

        if ($data['noImage'] === 'yes') {
            $data['thumbnail'] = '';
        }

        $this->update($data);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Category has been updated successfully'
        ]);
    }

    public function removeCategory()
    {
        $this->delete();
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Category has been updated successfully'
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
