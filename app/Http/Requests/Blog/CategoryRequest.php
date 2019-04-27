<?php

namespace App\Http\Requests\Blog;

use App\Facades\BlogCategory;
use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
        $category = $this->route('category');
        return [
            'slug' => 'max:255|unique:blog_categories'. (isset($category) ? ',slug,' . $category->id : null),
        ];
    }

//    public function storeCategory()
//    {
//        $name = $this->input('name');
//        BlogCategory::create();
//    }

//    public function updateCategory(BlogCategory $category)
//    {
//        $name = $this->input('name');
//        if($this->hasFile('imageThumbnail')) $category->thumbnail = $this->uploadFiles($this->file('imageThumbnail'), BlogCategory::uploadDir());
//        else if($this->canClearImage()) $category->thumbnail = null;
//
//        $category->name = $name;
//        $category->description = $this->input('description');
//        $category->published = $this->has('saveAndPublish');
//        $category->parent_id = (int)$this->input('parent_id');
//        $category->isDirty() ? $category->save() : null;
//        return $category;
//    }

    /**
     * @return array
     */
    public function getPayload()
    {
        $name = $this->input('name');

        return [
            'name' => $name,
            'slug' => str_slug($name),
            'description' => $this->input('description'),
            'published' => $this->has('saveAndPublish'),
            'thumbnail' =>  $this->hasFile('imageThumbnail') ?  $this->uploadFiles($this->file('imageThumbnail'), BlogCategory::uploadDir()) : null,
            'parent_id' => $this->has('parent_id') ? (int)$this->input('parent_id') : null
        ];
    }

}
