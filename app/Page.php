<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;
use App\Core\Services\Image;
use App\Traits\ModelTrait;
use App\Traits\HasFiles;

class Page extends Model
{

    use ModelTrait, HasFiles;

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

    protected static $sortable = [
        'title',
        'published',
        'created_at',
        'updated_at'
    ];

    public static function getPagesWithPagination()
    {
        return self::getModelDataWithPagination();
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
            $data['thumbnail'] = json_encode(self::uploadImage($data, 'imageThumbnail', getModuleUploadDir('pages')));
        }

        self::create($data);

        return redirect(route(getRouteName('pages', 'index')))->with('alert', [
            'type' => 'success',
            'message' => __('messages.item_created_success')
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
            'message' => __('messages.item_updated_success')
        ]);

    }

    public function removePage()
    {
        $this->delete();

        return back()->with('alert', [
            'type' => 'success',
            'message' => __('messages.item_deleted_success')
        ]);
    }

    public function toggleStatusAjax()
    {
        $res = $this->toggleModelStatus('published');

        return response()->json([
            'types' => 'success',
            'message' => __('messages.update_status_success'),
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
