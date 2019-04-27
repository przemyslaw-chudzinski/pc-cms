<?php

namespace App\Http\Requests\ProjectCategory;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class CategoryAjaxRequest extends FormRequest
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
        $category = $this->route('category');
        return [
            'slug' => 'required|max:255|unique:project_categories'.(isset($category) ? ',slug,' . $category->id : null),
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
