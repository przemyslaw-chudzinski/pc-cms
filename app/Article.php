<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;
use App\Traits\ModelTrait;
use App\Traits\HasFiles;

class Article extends Model
{

    use ModelTrait, HasFiles;

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

    public static function createNewArticle()
    {
        $data = request()->all();

        $data['published'] = self::toggleValue($data, 'saveAndPublish');

        $data['allow_comments'] = self::toggleValue($data, 'allowComments');

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
        return self::getModelDataWithPagination();
    }

    public function updateArticle()
    {
        $data = request()->all();

        $data['published'] = self::toggleValue($data, 'saveAndPublish');

        $data['allow_comments'] = self::toggleValue($data, 'allowComments');

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

    public function toggleStatusAjax()
    {
        $res = $this->toggleModelStatus('published');

        return response()->json([
           'types' => 'success',
           'message' => __('messages.update_status'),
           'newStatus' => $res['data']['published']
        ]);
    }

    public function toggleCommentsStatusAjax()
    {
        $res = $this->toggleModelStatus('allow_comments');

        return response()->json([
            'types' => 'success',
            'message' => __('messages.update_status'),
            'newStatus' => $res['data']['allow_comments']
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
            case 'change_comment_status_true':
                return self::massActionsChangeStatus($selected_ids, true, 'allow_comments');
            case 'change_comment_status_false':
                return self::massActionsChangeStatus($selected_ids, false, 'allow_comments');
        }
    }
}
