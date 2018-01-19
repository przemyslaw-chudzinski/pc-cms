<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;
use App\Core\Services\Image;

class Page extends Model
{
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

    public static function getPagesWithPagination()
    {
        return self::Paginate(10);
    }

    public static function createNewPage()
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
            $img = new Image($file, config('admin.modules.pages.upload_dir'));
            $img->upload();
            $data['thumbnail'] = $file->getClientOriginalName();
        }
        self::create($data);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Page has been created successfully'
        ]);
    }

    public function updatePage()
    {
        $data = request()->all();
        if (!isset($data['saveAndPublished'])) {
            $data['published'] = false;
        } else {
            $data['published'] = true;
        }
        if (isset($data['generateSlug'])) {
            $data['slug'] = str_slug($data['title']);
        } else {
            if (!isset($data['slug'])) {
                $data['slug'] = str_slug($data['title']);
            } else {
                $data['slug'] = str_slug($data['slug']);
            }
        }
        if (!isset($data['allow_indexed'])) {
            $data['allow_indexed'] = false;
        } else {
            $data['allow_indexed'] = true;
        }
        $validator = Validator::make($data, [
            'title' => 'required',
            'imageThumbnail' => 'image|max:2048',
            'slug' => [
                'required',
                Rule::unique('pages')->ignore($this->slug, 'slug')
            ],
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }
        if (request()->hasFile('imageThumbnail')) {
            $file = request()->file('imageThumbnail');
            $img = new Image($file, config('admin.modules.pages.upload_dir'));
            $img->upload();
            $data['thumbnail'] = $file->getClientOriginalName();
        }

        if ($data['noImage'] === 'yes') {
            $data['thumbnail'] = '';
        }

        $this->update($data);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Page has been updated successfully'
        ]);

    }

    public function removePage()
    {
        $this->delete();
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Page has been deleted successfully'
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
