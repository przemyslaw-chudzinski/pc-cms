<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;
use App\Traits\ModelTrait;
use App\Traits\FilesTrait;

class Article extends Model
{

    use ModelTrait, FilesTrait;

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

        $data['thumbnail'] = json_encode(self::uploadImage($data, 'imageThumbnail', getModuleUploadDir('blog')));

        $article = self::create($data);

        if (!empty($data['category_ids'])) {
            $article->categories()->sync($data['category_ids']);
        }

        return redirect(route(getRouteName('blog', 'index')))->with('alert', [
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

        $data['published'] = self::toggleValue($data, 'saveAndPublish');

        $data['slug'] = self::generateSlugBasedOn($data, 'title');

        $data['allow_indexed'] = self::toggleValue($data, 'allow_indexed');

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

        if (isset($data['imageThumbnail'])) {
            $data['thumbnail'] = json_encode(self::uploadImage($data, 'imageThumbnail', getModuleUploadDir('blog')));
        }

        if (isset($data['noImage']) && $data['noImage'] === 'yes') {
            $data['thumbnail'] = null;
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
