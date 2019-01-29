<?php

namespace App\Http\Requests\Blog;

use App\Article;
use App\Traits\HasFiles;
use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
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
            'title' => 'required|max:255',
            'imageThumbnail[]' => 'image|max:2048'
        ];
    }

    public function storeArticle()
    {
        $title = $this->input('title');
        $categoryIds = $this->input('category_ids');

        $article = Article::create([
            'title' => $title,
            'slug' =>  str_slug($title),
            'content' => $this->input('content'),
            'thumbnail' => $this->hasFile('imageThumbnail') ?  $this->uploadFiles($this->file('imageThumbnail'), Article::uploadDir()) : null,
            'allow_comments' => $this->has('allowComments'),
            'allow_indexed' => $this->has('allow_indexed'),
            'published' => $this->has('saveAndPublish'),
            'meta_title' => $this->has('meta_title') ? $this->input('meta_title') : null,
            'meta_description' => $this->has('meta_description') ? $this->input('meta_description') : null
        ]);
        $this->has('category_ids') && count($categoryIds) > 0 ? $article->categories()->sync($categoryIds) : null;
    }

    public function updateArticle(Article $article)
    {
        $title = $this->input('title');
        $categoryIds = $this->input('category_ids');

        if($this->hasFile('imageThumbnail')) $article->thumbnail = $this->uploadFiles($this->file('imageThumbnail'), Article::uploadDir());
        else if($this->canClearImage()) $article->thumbnail = null;

        $article->title = $title;
        $article->content = $this->input('content');
        $article->meta_title = $this->has('meta_title') ? $this->input('meta_title') : null;
        $article->meta_description = $this->has('meta_description') ? $this->input('meta_description') : null;
        $article->allow_comments = $this->has('allowComments');
        $article->allow_indexed = $this->has('allow_indexed');
        $article->published = $this->has('saveAndPublish');
        $this->has('category_ids') && count($categoryIds) > 0 ? $article->categories()->sync($categoryIds) : $article->categories()->detach();
        $article->isDirty() ? $article->save() : null;
        return $article;
    }
}
