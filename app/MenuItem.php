<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Validator;

class MenuItem extends Model
{
    protected $fillable = [
        'menu_id',
        'title',
        'url',
        'target',
        'parent_id',
        'order'
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

        $validator = Validator::make($data, [
           'title' => 'required'
        ]);

        if ($validator->fails()) {
            return back()->with('alert', [
                'type' => 'danger',
                'message' => 'The title field is required'
            ]);
        }

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

}
