<?php

namespace App\Http\Requests\Blog;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Contracts\Validation\Validator as ValidatorContract;

class ArticleAjaxRequest extends FormRequest
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
        $article = $this->route('article');
        return [
            'slug' => 'required|max:255|unique:articles'.(isset($article) ? ',slug,' . $article->id : null),
        ];
    }

    /**
     * @param ValidatorContract $validator
     * @return void|null
     */
    protected function failedValidation(ValidatorContract $validator)
    {
        return null;
    }

    /**
     * @return ValidatorContract
     */
    public function getValidatorInstance()
    {
        return parent::getValidatorInstance();
    }

}
