<?php

namespace App\Http\Requests\Project;

use App\Project;
use App\Traits\Toggleable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;

class ProjectAjaxRequest extends FormRequest
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

    public function updateSlug(Project $project)
    {

        $validator = Validator::make($this->all(), [
            'slug' => 'required|max:255|unique:projects'.(isset($project) ? ',slug,' . $project->id : null),
        ]);

        if ($validator->fails()) return [
            'message' => $validator->errors()->first(),
            'error' => true,
            'type' => 'error'
        ];

        $slug = $this->input('slug');
        $project->slug = str_slug($slug);
        $project->isDirty() && $project->save();
        return $project->slug;
    }
}
