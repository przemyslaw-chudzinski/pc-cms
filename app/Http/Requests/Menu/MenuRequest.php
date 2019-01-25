<?php

namespace App\Http\Requests\Menu;

use App\Menu;
use Illuminate\Foundation\Http\FormRequest;

class MenuRequest extends FormRequest
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
        $menu = $this->route('menu');
        return [
            'name' => 'max:255|required',
            'slug' => 'max:255|unique:menus' . (isset($menu) ? ',slug,' . $menu->id : null)
        ];
    }

    public function storeMenu()
    {
        $name = $this->input('name');
        $slug = $this->input('slug');
        Menu::create([
            'name' => $name,
            'slug' => isset($slug) ? str_slug($slug) : str_slug($name),
            'description' => $this->input('description'),
            'published' => $this->has('saveAndPublish')
        ]);
    }

    public function updateMenu(Menu $menu)
    {
        $name = $this->input('name');
        $slug = $this->input('slug');
        $menu->name = $name;
        $this->has('slug') && $slug !== $menu->slug ? str_slug($slug) : null;
        $menu->description = $this->input('description');
        $menu->published = $this->has('saveAndPublish');
        $menu->isDirty() ? $menu->save() : null;
        return $menu;
    }
}
