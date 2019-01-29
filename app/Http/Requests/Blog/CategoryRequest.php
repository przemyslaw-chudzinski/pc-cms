<?php

namespace App\Http\Requests\Blog;

use App\BlogCategory;
use App\Traits\HasFiles;
use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
        return [
            'name' => 'required|max:255',
            'imageThumbnail[]' => 'image|max:2048'
        ];
    }

    public function storeCategory()
    {
        $name = $this->input('name');
        BlogCategory::create([
            'name' => $name,
            'slug' => str_slug($name),
            'description' => $this->input('description'),
            'published' => $this->has('saveAndPublish'),
            'thumbnail' =>  $this->hasFile('imageThumbnail') ?  $this->uploadFiles($this->file('imageThumbnail'), BlogCategory::uploadDir()) : null,
            'parent_id' => $this->has('parent_id') ? (int)$this->input('parent_id') : null
        ]);
    }

    public function updateCategory(BlogCategory $category)
    {
        $name = $this->input('name');
        if($this->hasFile('imageThumbnail')) $category->thumbnail = $this->uploadFiles($this->file('imageThumbnail'), BlogCategory::uploadDir());
        else if($this->canClearImage()) $category->thumbnail = null;

        $category->name = $name;
        $category->description = $this->input('description');
        $category->published = $this->has('saveAndPublish');
        $category->parent_id = (int)$this->input('parent_id');
        $category->isDirty() ? $category->save() : null;
        return $category;
    }
}
