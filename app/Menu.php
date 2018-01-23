<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
use Validator;

class Menu extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'published'];

    public function items()
    {
        return $this->hasMany(MenuItem::class, 'menu_id');
    }

    public function parentItems()
    {
        return $this->hasMany(MenuItem::class)->whereNull('parent_id');
    }

    public static function getMenusWithPagination()
    {
        return self::paginate(10);
    }

    public static function createMenu()
    {
        $data = request()->all();
        if (isset($data['slug'])) {
            $data['slug'] = str_slug($data['slug']);
        } else {
            $data['slug'] = str_slug($data['name']);
        }
        if ($data['published'] == 'on') {
            $data['published'] = true;
        } else {
            $data['published'] = false;
        }
        $validator = Validator::make($data, [
            'name' => 'required',
            'slug' => 'unique:menus'
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }
        self::create($data);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Menu has been created successfully'
        ]);
    }

    public function updateMenu()
    {
        $data = request()->all();
        if (!isset($data['saveAndPublished'])) {
            $data['published'] = false;
        } else {
            $data['published'] = true;
        }
        if (isset($data['generateSlug'])) {
            $data['slug'] = str_slug($data['name']);
        } else {
            if (!isset($data['slug'])) {
                $data['slug'] = str_slug($data['name']);
            } else {
                $data['slug'] = str_slug($data['slug']);
            }
        }

        $validator = Validator::make($data, [
            'name' => 'required',
            'slug' => [
                'required',
                Rule::unique('menus')->ignore($this->slug, 'slug')
            ],
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $this->update($data);

        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Menus has been updated successfully'
        ]);
    }

    private function toggleStatus()
    {
        $data['published'] = false;
        if (!$this->published) {
            $data['published'] = true;
        }
        $result = $this->update($data);
        return [
            'result' => $result,
            'data' => $data
        ];
    }

    public function toggleStatusAjax()
    {
        $res = $this->toggleStatus();
        return response()->json([
            '7' => 'success',
            'message' => __('messages.update_status'),
            'newStatus' => $res['data']['published']
        ]);
    }

    public function getItems()
    {
        return $this->parentItems()->with('children')->get();
    }

    public function getItemsAjax()
    {
        return $this->getItems();
    }
}
