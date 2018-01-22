<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Core\Services\Image;
use Illuminate\Validation\Rule;
use Validator;

class Article extends Model
{
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

    public function categories()
    {
        return $this->belongsToMany(BlogCategory::class, 'article_has_category', 'article_id', 'category_id')->withTimestamps();
    }

    public function getCategoryIdsAttribute()
    {
        return $this->categories->pluck('id')->all();
    }

    public static function createNewArticle()
    {
        $data = request()->all();
        if (!isset($data['saveAndPublished'])) {
            $data['published'] = false;
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
            $img = new Image($file, config('admin.modules.blog.upload_dir'));
            $img->upload();
            $data['thumbnail'] = $file->getClientOriginalName();
        }
        $article = self::create($data);
        if (!empty($data['category_ids'])) {
            $article->categories()->sync($data['category_ids']);
        }
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Article has been created successfully'
        ]);
    }

    public static function getArticlesWithPagination()
    {
        return self::paginate(10);
    }

    public function updateArticle()
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
                Rule::unique('articles')->ignore($this->slug, 'slug')
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

        if ($data['noImage'] === 'yes') {
            $data['thumbnail'] = '';
        }

        $this->update($data);
        if (!empty($data['category_ids'])) {
            $this->categories()->sync($data['category_ids']);
        } else {
            $this->categories()->detach();
        }
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Article has been updated successfully'
        ]);

    }

    public function removeArticle()
    {
        $this->delete();
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Article has been deleted successfully'
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
           'message' => __('messages.update_status'),
           'newStatus' => $res['data']['published']
        ]);
    }
}
