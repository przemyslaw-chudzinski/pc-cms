<?php

namespace App\Core\Theme;

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

    /**
     * @param $key
     * @return mixed
     */
    public function getSetting($key)
    {
        return Setting::where('key', $key)->get()->first()->value;
    }

    public function getImageUrl(string $image, string $uploadDir, string $size)
    {
//        dd(File::allFiles(base_path() . '/public/storage/' . $uploadDir)); // ???
//        $files = File::allFiles(base_path() . '/public/storage/' . $uploadDir);
//        foreach ($files as $file) {
//            // sprawdzić dopasowania
//        }
//        return $image;
    }

}