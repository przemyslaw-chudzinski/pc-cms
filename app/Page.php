<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;
use App\Core\Services\Image;
use App\Traits\ModelTrait;
use App\Traits\FilesTrait;

class Page extends Model
{

    use ModelTrait, FilesTrait;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'published',
        'thumbnail',
        'allow_indexed',
        'meta_title',
        'meta_description',
        'template'
    ];

    public static function getPagesWithPagination()
    {
        return self::latest()->paginate(10);
    }

    public static function createNewPage()
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

        if (isset($data['imageThumbnail'])) {
            $data['thumbnail'] = json_encode(self::uploadImage($data, 'imageThumbnail', getModuleUploadDir('blog_categories')));
        }

        self::create($data);

        return redirect(route(getRouteName('pages', 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Page has been created successfully'
        ]);
    }

    public function updatePage()
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
                Rule::unique('pages')->ignore($this->slug, 'slug')
            ],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        if (isset($data['imageThumbnail'])) {
            $data['thumbnail'] = json_encode(self::uploadImage($data, 'imageThumbnail', getModuleUploadDir('pages')));
        }

        if (isset($data['noImage']) && $data['noImage'] === 'yes') {
            $data['thumbnail'] = null;
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
