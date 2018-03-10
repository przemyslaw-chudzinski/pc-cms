<?php

namespace App;

use App\Traits\FilesTrait;
use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;
use Validator;

class MenuItem extends Model
{
    use ModelTrait, FilesTrait;

    protected $fillable = [
        'menu_id',
        'title',
        'url',
        'target',
        'parent_id',
        'order',
        'image'
    ];


    public function children()
    {
        return $this->hasMany(MenuItem::class, 'parent_id')->with('children');
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }

    public static function createItem(Menu $menu)
    {
        $data = request()->all();

        if (isset($data['url'])) {
            $data['url'] = str_slug($data['url']);
        }

        $validator = Validator::make($data, [
           'title' => 'required',
           'menuItemImage' => 'image|max:2048'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $data['image'] = json_encode(self::uploadImage($data, 'menuItemImage', getModuleUploadDir('menus')));

        $menu->items()->create($data);

        return back()->with('alert', [
           'type' => 'success',
           'message' => 'Menu item has been created successfully'
        ]);
    }

    public function removeItem()
    {
        $this->delete();
    }

    public function removeItemAjax()
    {
        $this->removeItem();

        return response()->json([
            'type' => 'success',
            'message' => 'Item has been deleted successfully'
        ]);
    }

    public function updateItem()
    {
        $data = request()->all();

        if (isset($data['url'])) {
            $data['url'] = str_slug($data['url']);
        }

        $validator = Validator::make($data, [
            'title' => 'required'
        ]);

        if ($validator->fails()) {
            return back()->with('alert', [
                'type' => 'danger',
                'message' => 'The title field is required'
            ]);
        }

        $this->update($data);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Menu item has been updated successfully'
        ]);

    }

}
