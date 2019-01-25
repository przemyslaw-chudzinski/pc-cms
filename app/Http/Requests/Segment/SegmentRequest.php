<?php

namespace App\Http\Requests\Segment;

use App\Segment;
use App\Traits\HasFiles;
use Illuminate\Foundation\Http\FormRequest;

class SegmentRequest extends FormRequest
{
    use HasFiles;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $segment = $this->route('segment');
        return [
            'key' => 'max:255|required|unique:segments' . (isset($segment) ? ',key,' . $segment->id : null),
            'description' => 'max:255',
            'content' => 'max:255',
            'segmentImage[]' => 'image|max:2048'
        ];
    }

    public function storeSegment()
    {
        Segment::create([
            'key' => str_slug(strtolower($this->input('key'))),
            'description' => $this->input('description'),
            'content' => $this->input('content'),
            'image' => $this->hasFile('segmentImage') ?  $this->uploadFiles($this->file('segmentImage'), Segment::uploadDir()) : null
        ]);
    }

    public function updateSegment(Segment $segment)
    {
        if ($this->has('key') && strtolower($this->input('key')) !== $segment->key) {
            $segment->key = str_slug(strtolower($this->input('key')));
        }
        $segment->content = $this->input('content');
        $segment->description = $this->input('description');
        if ($this->hasFile('segmentImage')) {
            $segment->image = $this->uploadFiles($this->file('segmentImage'), Segment::uploadDir());
        }
        $segment->isDirty() ? $segment->save() : null;
        return $segment;
    }

    protected function uploadImage()
    {
        if ($this->hasFile('segmentImage')) {
            $this->uploadFiles($this->file('segmentImage'), config('admin.modules.segments.upload_dir'));
        }
    }

}
