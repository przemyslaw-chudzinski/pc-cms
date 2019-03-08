<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
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
        $project = $this->route('project');
        return [
            'title' => 'required|max:255',
            'slug' => 'max:255|unique:projects'. (isset($project) ? ',slug,' . $project->id : null),
            'images[]' => 'image|max:2048'
        ];
    }
}
