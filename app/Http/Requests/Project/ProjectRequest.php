<?php

namespace App\Http\Requests\Project;

use App\Project;
use App\ProjectCategory;
use App\Traits\HasFiles;
use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
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
        $project = $this->route('project');
        return [
            'title' => 'required|max:255',
            'slug' => 'max:255|unique:projects'. (isset($project) ? ',slug,' . $project->id : null),
            'imageThumbnail[]' => 'image|max:2048',
            'images[]' => 'image|max:2048'
        ];
    }

//    public function storeProject()
//    {
//        $title = $this->input('title');
//        $slug = $this->input('slug');
//        $categoryIds = $this->input('category_ids');
//        $project = Project::create([
//            'title' => $title,
//            'slug' => isset($slug) ? str_slug($slug) : str_slug($title),
//            'content' => $this->input('content'),
//            'published' => $this->has('saveAndPublish'),
//            'thumbnail' =>  $this->hasFile('imageThumbnail') ?  $this->uploadFiles($this->file('imageThumbnail'), ProjectCategory::uploadDir()) : null,
//            'images' =>  $this->hasFile('additionalImages') ?  $this->uploadFiles($this->file('additionalImages'), ProjectCategory::uploadDir()) : null,
//            'meta_title' => $this->input('meta_title'),
//            'meta_description' => $this->input('meta_description'),
//            'allow_indexed' => $this->has('allow_indexed')
//        ]);
//        $this->has('category_ids') ? $project->categories()->sync($categoryIds) : null;
//    }

//    public function updateProject(Project $project)
//    {
//        $title = $this->input('title');
//        $categoryIds = $this->input('category_ids');
//
//        if($this->hasFile('imageThumbnail')) $project->thumbnail = $this->uploadFiles($this->file('imageThumbnail'), ProjectCategory::uploadDir());
//        else if($this->canClearImage()) $project->thumbnail = null;
//
//        if($this->hasFile('additionalImages')) $project->images = $this->uploadFiles($this->file('additionalImages'), ProjectCategory::uploadDir());
//        else if($this->canClearImage('noImages')) $project->images = null;
//
//        $project->title = $title;
//
//        $project->content = $this->input('content');
//        $project->published = $this->has('saveAndPublish');
//        $project->meta_title = $this->input('meta_title');
//        $project->meta_description = $this->input('meta_description');
//        $project->allow_indexed = $this->has('allow_indexed');
//        $this->has('category_ids') ? $project->categories()->sync($categoryIds) : $project->categories()->detach();
//        $project->isDirty() ? $project->save() : null;
//        return $project;
//    }

//    protected function updateSlug($slug, $createFrom, $slugIndex = 'slug')
//    {
//        $slugFromRequest = $this->has($slugIndex) ? $this->input($slugIndex) : null;
//
//        if (!$slugFromRequest || ($slugFromRequest && strlen($slugFromRequest))) return str_slug($createFrom);
//        if ($slugFromRequest && $slugFromRequest !== $slug) return str_slug($slugFromRequest);
//    }
}
