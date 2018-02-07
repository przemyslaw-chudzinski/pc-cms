<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;
use App\Traits\FilesTrait;
use App\Traits\ModelTrait;

class ProjectCategory extends Model
{

    use FilesTrait, ModelTrait;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'published',
        'thumbnail'
    ];

    public static function getCategoriesWithPagination()
    {
        return self::latest()->paginate(10);
    }

    public static function getCategories()
    {
        return self::get();
    }

    public static function createNewCategory()
    {
        $data = request()->all();

        $data['published'] = self::toggleValue($data, 'saveAndPublish');

        $data['slug'] = self::createSlug($data, 'name');

        $validator = Validator::make($data, [
            'name' => 'required',
            'slug' => 'unique:project_categories',
            'imageThumbnail' => 'image|max:2048'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        if (isset($data['imageThumbnail'])) {
            $data['thumbnail'] = json_encode(self::uploadImage($data, 'imageThumbnail', getModuleUploadDir('project_categories')));
        }

        self::create($data);

        return redirect(route(getRouteName('project_categories', 'index')))->with('alert', [
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
                Rule::unique('project_categories')->ignore($this->slug, 'slug')
            ],
            'imageThumbnail' => 'image|max:2048'
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        if (isset($data['imageThumbnail'])) {
            $data['thumbnail'] = json_encode(self::uploadImage($data, 'imageThumbnail', getModuleUploadDir('project_categories')));
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
