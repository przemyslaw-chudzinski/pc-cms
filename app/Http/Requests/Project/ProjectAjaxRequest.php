<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class ProjectAjaxRequest extends FormRequest
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
            'slug' => 'required|max:255|unique:projects'.(isset($project) ? ',slug,' . $project->id : null),
        ];
    }

    /**
     * @param \Illuminate\Contracts\Validation\Validator $validator
     * @return void|null
     */
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        return null;
    }

    /**
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function getValidatorInstance()
    {
        return parent::getValidatorInstance();
    }
}
