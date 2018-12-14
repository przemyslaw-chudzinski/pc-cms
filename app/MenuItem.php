<?php

namespace App;

use App\Core\Contracts\WithFiles;
use App\Traits\HasFiles;
use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model implements WithFiles
{
    use ModelTrait, HasFiles;

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

    public static function uploadDir()
    {
        return config('admin.modules.menus.upload_dir');
    }
}
