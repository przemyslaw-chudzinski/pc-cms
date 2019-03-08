<?php

namespace App\Http\Requests\ProjectCategory;

use App\ProjectCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;

class CategoryAjaxRequest extends FormRequest
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
        return [
            //
        ];
    }

    public function updateSlug(ProjectCategory $category)
    {
        $validator = Validator::make($this->all(), [
            'slug' => 'required|max:255|unique:project_categories'.(isset($category) ? ',slug,' . $category->id : null),
        ]);

        if ($validator->fails()) return [
            'message' => $validator->errors()->first(),
            'error' => true,
            'type' => 'error'
        ];

        $slug = $this->input('slug');
        $category->slug = str_slug($slug);
        $category->isDirty() && $category->save();
        return $category->slug;
    }
}
