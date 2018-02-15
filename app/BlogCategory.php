<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;
use App\Traits\ModelTrait;
use App\Traits\FilesTrait;

class BlogCategory extends Model
{

    use ModelTrait, FilesTrait;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'published',
        'thumbnail',
        'parent_id'
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
        return self::latest()->paginate(10);
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
