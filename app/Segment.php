<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Validator;
use Illuminate\Validation\Rule;

class Segment extends Model
{
    protected $fillable = [
        'name',
        'content'
    ];

    public static function getSegmentsWithPagination()
    {
        return self::paginate(10);
    }

    public static function createNewSegment()
    {
        $data = request()->all();

        $data['name'] = str_slug($data['name']);

        $validator = Validator::make($data, [
            'name' => 'required|unique:segments'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        self::create($data);

        return back()->with('alert', [
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
            ]
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
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
}
