<?php

namespace App\Http\Requests\Blog;

use App\Article;
use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
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
            'title' => 'required|max:255'
        ];
    }

    /**
     * @return array
     */
    public function getPayload()
    {
        $title = $this->input('title');

        return [
            'title' => $title,
            'slug' =>  str_slug($title),
            'content' => $this->input('content'),
            'thumbnail' => $this->hasFile('imageThumbnail') ?  $this->uploadFiles($this->file('imageThumbnail'), Article::uploadDir()) : null,
            'allow_comments' => $this->has('allowComments'),
            'allow_indexed' => $this->has('allow_indexed'),
            'published' => $this->has('saveAndPublish'),
            'meta_title' => $this->has('meta_title') ? $this->input('meta_title') : null,
            'meta_description' => $this->has('meta_description') ? $this->input('meta_description') : null,
            'category_ids' => $this->input('category_ids')
        ];
    }
}
