<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = ['menu_id', 'title', 'url', 'target', 'parent_id', 'order'];


    public function children()
    {
        return $this->hasMany(MenuItem::class, 'parent_id')->with('children');
    }

}
