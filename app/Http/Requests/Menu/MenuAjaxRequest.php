<?php

namespace App\Http\Requests\Menu;

use App\Menu;
use App\MenuItem;
use App\Traits\Toggleable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;

class MenuAjaxRequest extends FormRequest
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

    public function updateTree()
    {
        $items = json_decode($this->input('items'));
        $this->orderMenu($items, null);
    }

    private function orderMenu(array $menuItems, $parentId)
    {
        foreach ($menuItems as $index => $menuItem) {
            $item = MenuItem::findOrFail($menuItem->id);
            $item->order = $index + 1;
            $item->parent_id = $parentId;
            $item->save();

            if (isset($menuItem->children)) {
                $this->orderMenu($menuItem->children, $item->id);
            }
        }
    }

    public function updateSlug(Menu $menu)
    {
        $validator = Validator::make($this->all(), [
            'slug' => 'required|max:255|unique:menus'.(isset($menu) ? ',slug,' . $menu->id : null),
        ]);

        if ($validator->fails()) return [
            'message' => $validator->errors()->first(),
            'error' => true,
            'type' => 'error'
        ];

        $slug = $this->input('slug');
        $menu->slug = str_slug($slug);
        $menu->isDirty() && $menu->save();
        return $menu->slug;
    }
}
