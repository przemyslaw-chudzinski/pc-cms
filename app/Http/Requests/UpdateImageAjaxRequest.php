<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class UpdateImageAjaxRequest extends FormRequest
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
            'imageID' => ['required', 'numeric']
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

    /**
     * @return int
     */
    public function getImageID()
    {
        return (int) $this->input('imageID');
    }
}
