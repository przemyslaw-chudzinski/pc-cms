<?php

namespace App\Http\Requests\Project;

use Illuminate\Contracts\Validation\Validator;
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
     * @param Validator $validator
     * @return void|null
     */
    protected function failedValidation(Validator $validator)
    {
        return null;
    }

    /**
     * @return Validator
     */
    public function getValidatorInstance()
    {
        return parent::getValidatorInstance();
    }
}
