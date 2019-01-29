<?php

namespace App\Http\Requests\Blog;

use App\Article;
use App\Traits\Toggleable;
use Illuminate\Foundation\Http\FormRequest;
use Validator;

class ArticleAjaxRequest extends FormRequest
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

    public function updateSlug(Article $article)
    {

        $validator = Validator::make($this->all(), [
            'slug' => 'required|max:255|unique:articles'.(isset($article) ? ',slug,' . $article->id : null),
        ]);

        if ($validator->fails()) return [
            'message' => $validator->errors()->first(),
            'error' => true,
            'type' => 'error'
        ];

        $slug = $this->input('slug');
        $article->slug = str_slug($slug);
        $article->isDirty() && $article->save();
        return $article->slug;
    }
}
