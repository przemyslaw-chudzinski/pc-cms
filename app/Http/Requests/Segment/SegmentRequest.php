<?php

namespace App\Http\Requests\Segment;

use Illuminate\Foundation\Http\FormRequest;

class SegmentRequest extends FormRequest
{
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
            'content' => 'max:255'
        ];
    }


}
