<?php

namespace App\Http\Requests\Menu;

use App\Menu;
use App\MenuItem;
use App\Traits\HasFiles;
use Illuminate\Foundation\Http\FormRequest;

class MenuItemRequest extends FormRequest
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
        return [
            'title' => 'required|max:255',
            'menuItemImage[]' => 'image|max:2048',
        ];
    }

    public function storeItem(Menu $menu)
    {
        $menu->items()->create([
            'title' => $this->input('title'),
            'url' => $this->input('url'),
            'target' => $this->input('target'),
            'image' => $this->hasFile('menuItemImage') ?  $this->uploadFiles($this->file('menuItemImage'), MenuItem::uploadDir()) : null,
        ]);
    }

    public function updateItem(MenuItem $item)
    {
        // TODO: Problem with update image
        dd( $this->has('menuItemImage'));
        $this->hasFile('menuItemImage') ? $item->image = $this->uploadFiles($this->file('menuItemImage'), MenuItem::uploadDir()) : null;
        $item->title = $this->input('title');
        $item->url = $this->input('url');
        $item->target = $this->input('target');
        $item->isDirty() ? $item->save() : null;
        return $item;
    }
}
