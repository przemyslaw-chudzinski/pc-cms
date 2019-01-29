<?php

namespace App\Http\Requests\Page;

use App\Page;
use App\Traits\Toggleable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;

class PageAjaxRequest extends FormRequest
{
    use Toggleable;
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
        return [
            //
        ];
    }

    public function updateSlug(Page $page)
    {
        $validator = Validator::make($this->all(), [
            'slug' => 'required|max:255|unique:pages'.(isset($page) ? ',slug,' . $page->id : null),
        ]);

        if ($validator->fails()) return [
            'message' => $validator->errors()->first(),
            'error' => true,
            'type' => 'error'
        ];

        $slug = $this->input('slug');
        $page->slug = str_slug($slug);
        $page->isDirty() && $page->save();
        return $page->slug;
    }

}
