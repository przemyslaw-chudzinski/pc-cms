<?php

namespace App\Core\Theme;


use App\Setting;

class Theme
{
    public function getMetaTitle($title = '')
    {
        if ($title === '' || $title === null) {
            $title = $this->getSetting('site_title');
        }
        return view('admin.components.theme.title', [
            'meta_title' => $title
        ]);
    }

    public function getMetaDescription($description = '')
    {
        if ($description === '' || $description === null) {
            $description = $this->getSetting('site_description');
        }
        return view('admin.components.theme.meta', [
            'name' => 'description',
            'content' => $description
        ]);
    }

    public function getSetting($key)
    {
        return Setting::where('key', $key)->get()->first()->value;
    }
}