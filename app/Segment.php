<?php

namespace App;

use App\Traits\FilesTrait;
use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;
use Validator;
use Illuminate\Validation\Rule;

class Segment extends Model
{

    use ModelTrait, FilesTrait;

    protected $fillable = [
        'name',
        'content',
        'image'
    ];

    protected static $sortable = [
        'name',
        'created_at',
        'updated_at'
    ];

    public static function getSegmentsWithPagination()
    {
        return self::getModelDataWithPagination();
    }

    public static function createNewSegment()
    {
        $data = request()->all();

        $data['name'] = str_slug($data['name']);

        $validator = Validator::make($data, [
            'name' => 'required|unique:segments',
            'segmentImage' => 'image|max:2048'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $data['image'] = json_encode(self::uploadImage($data, 'segmentImage', getModuleUploadDir('segments')));

        self::create($data);

        return redirect(route(getRouteName('segments', 'index')))->with('alert', [
            'type' => 'success',
            'message' => 'Segment has been created successfully'
        ]);
    }

    public function updateSegment()
    {
        $data = request()->all();

        $validator = Validator::make($data, [
            'name' => [
                'required',
                Rule::unique('segments')->ignore($this->name, 'name')
            ],
            'segmentImage' => 'image|max:2048'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        if (isset($data['segmentImage'])) {
            $data['image'] = json_encode(self::uploadImage($data, 'segmentImage', getModuleUploadDir('segments')));
        }

        if (isset($data['noImage']) && $data['noImage'] === 'yes') {
            $data['image'] = null;
        }

        $this->update($data);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Segment has been updated successfully'
        ]);
    }

    public function removeSegment()
    {
        $this->delete();

        return back()->with('alert' , [
            'type' => 'success',
            'message' => 'Segment has been deleted successfully'
        ]);
    }

    public static function massActions()
    {
        $data = request()->all();
        $selected_ids = explode(',', $data['selected_values']);

        switch ($data['action_name']) {
            case 'delete':
                return self::massActionsDelete($selected_ids);
        }
    }
}
