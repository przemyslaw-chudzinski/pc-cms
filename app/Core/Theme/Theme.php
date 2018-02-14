<?php

namespace App\Core\Theme;

use App\Menu;
use App\Setting;
use File;

class Theme
{
    /**
     * @param string $title
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getMetaTitle($title = '')
    {
        if ($title === '' || $title === null) {
            $title = $this->getSetting('site_title');
        }

        return view('admin.material_theme.components.theme.title', [
            'meta_title' => $title
        ]);
    }

    /**
     * @param string $description
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getMetaDescription($description = '')
    {
        if ($description === '' || $description === null) {
            $description = $this->getSetting('site_description');
        }

        return view('admin.material_theme.components.theme.meta', [
            'name' => 'description',
            'content' => $description
        ]);
    }

    public function getMetaRobots($allow_indexed = true)
    {
        if ($allow_indexed) {
            return view('admin.material_theme.components.theme.meta', [
                'name' => 'robots',
                'content' => 'index, follow'
            ]);
        }
        return view('admin.material_theme.components.theme.meta', [
            'name' => 'robots',
            'content' => 'noindex, nofollow'
        ]);
    }

    /**
     * @param $key
     * @return mixed
     */
    public function getSetting($key)
    {
        return Setting::where('key', $key)->get()->first()->value;
    }

    public function menu($path = '', $menu)
    {
        $menu = Menu::where([
            ['slug', $menu],
            ['published', true]
        ])->get()->first();

        if (!$menu) {
            return null;
        }

        return view($path)->with('items', $menu->getItems());
    }

}