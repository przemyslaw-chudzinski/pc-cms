<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;
use App\Traits\ModelTrait;
use App\Traits\HasFiles;

class BlogCategory extends Model
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

    public static function getAllCategories()
    {
        return self::get();
    }

    public static function getCategoriesWithPagination()
    {
        return self::getModelDataWithPagination();
    }

    public static function createNewCategory()
    {
        $data = request()->all();

        $data['published'] = self::toggleValue($data, 'saveAndPublish');

        $data['slug'] = self::createSlug($data, 'name');

        $validator = Validator::make($data, [
            'name' => 'required',
            'slug' => 'unique:blog_categories',
            'imageThumbnail' => 'image|max:2048'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        if (isset($data['imageThumbnail'])) {
            $data['thumbnail'] = json_encode(self::uploadImage($data, 'imageThumbnail', getModuleUploadDir('blog_categories')));
        }

        self::create($data);

        return redirect(route(getRouteName('blog_categories', 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Category has been created successfully'
        ]);
    }

    public function updateCategory()
    {
        $data = request()->all();

        $data['published'] = self::toggleValue($data, 'saveAndPublish');

        $data['slug'] = self::generateSlugBasedOn($data, 'name');

        $validator = Validator::make($data, [
            'name' => 'required',
            'slug' => [
                'required',
                Rule::unique('blog_categories')->ignore($this->slug, 'slug')
            ],
            'imageThumbnail' => 'image|max:2048'
        ]);
        if (
            $validator->fails()) {
            return back()->withErrors($validator);
        }

        if (isset($data['imageThumbnail'])) {
            $data['thumbnail'] = json_encode(self::uploadImage($data, 'imageThumbnail', getModuleUploadDir('blog_categories')));
        }

        if (isset($data['noImage']) && $data['noImage'] === 'yes') {
            $data['thumbnail'] = null;
        }

        $this->update($data);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Category has been updated successfully'
        ]);
    }

    public function removeCategory()
    {
        return 'usuwam';
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
}
