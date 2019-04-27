<?php

namespace App\Http\Requests\Blog;

use Illuminate\Contracts\Validation\Validator as ValidatorContract;
use Illuminate\Foundation\Http\FormRequest;

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
        $category = $this->route('blogCategory');
        return [
            'slug' => 'required|max:255|unique:blog_categories'.(isset($category) ? ',slug,' . $category->id : null),
        ];
    }

//    public function updateSlug(BlogCategory $category)
//    {
//
//        $validator = Validator::make($this->all(), [
//            'slug' => 'required|max:255|unique:blog_categories'. (isset($category) ? ',slug,' . $category->id : null),
//        ]);
//
//        if ($validator->fails()) return [
//            'message' => $validator->errors()->first(),
//            'error' => true,
//            'type' => 'error'
//        ];
//
//        $slug = $this->input('slug');
//        $category->slug = str_slug($slug);
//        $category->isDirty() && $category->save();
//        return $category->slug;
//    }

    /**
     * @param ValidatorContract $validator
     * @return void|null
     */
    protected function failedValidation(ValidatorContract $validator)
    {
        return null;
    }

    /**
     * @return ValidatorContract
     */
    public function getValidatorInstance()
    {
        return parent::getValidatorInstance();
    }
}
