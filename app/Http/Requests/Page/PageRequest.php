<?php

namespace App\Http\Requests\Page;

use App\Page;
use App\Traits\HasFiles;
use Illuminate\Foundation\Http\FormRequest;

class PageRequest extends FormRequest
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
        $page = $this->route('page');
        return [
            'title' => 'required|max:255',
            'slug' => 'max:255|unique:pages'. (isset($page) ? ',slug,'. $page->id : null),
            'imageThumbnail[]' => 'image|max:2048'
        ];
    }

    public function storePage()
    {
        $title = $this->input('title');
        $slug = $this->input('slug');
        Page::create([
            'title' => $title,
            'slug' => isset($slug) ? str_slug($slug) : str_slug($title),
            'content' => $this->input('content'),
            'allow_indexed' => $this->has('allow_indexed'),
            'published' => $this->has('saveAndPublish'),
            'thumbnail' => $this->hasFile('imageThumbnail') ?  $this->uploadFiles($this->file('imageThumbnail'), Page::uploadDir()) : null,
            'template' => $this->input('template'),
            'meta_title' => $this->input('meta_title'),
            'meta_description' => $this->input('meta_description')
        ]);
    }

    public function updatePage(Page $page)
    {
        $title = $this->input('title');
        $slug = $this->input('slug');
        $page->title = $title;
        $this->has('slug') && $slug !== $page->slug ? str_slug($slug) : null;
        $this->hasFile('imageThumbnail') ?  $page->thumbnail = $this->uploadFiles($this->file('imageThumbnail'), Page::uploadDir()) : null;
        $page->content = $this->input('content');
        $page->allow_indexed = $this->has('allow_indexed');
        $page->published = $this->has('saveAndPublish');
        $page->template = $this->input('template');
        $page->meta_title = $this->input('meta_title');
        $page->meta_description = $this->input('meta_description');
        $page->isDirty() ? $page->save() : null;
        return $page;
    }
}
