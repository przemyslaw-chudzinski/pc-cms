<?php

namespace App\Core\Services;

use App\Page;
use App\Setting;
use File;
use App\Facades\Theme;

class ThemeService
{
    public static function getView($slug = '')
    {

        if ($slug === '') {

            return view('themes.index');

        }

        /* Theme directory name */
        $theme = self::getTheme();

        if ($theme === null || $theme === '') {
            throw new \Exception('Theme does not exits');
        }

        $page = Page::
            where('slug', $slug)
            ->where('published', true)
            ->get()
            ->first();

        if ($page && $page->template !== null) {

            return 'custom template';

        } else if ($page) {

            return view('themes.' . $theme . '.page-templates.default', ['page' => $page]);

        }

        return '404';
    }

    public static function getThemesList()
    {
        $pathThemes = base_path('resources' . DIRECTORY_SEPARATOR . 'views' . DIRECTORY_SEPARATOR . 'themes');
        $themeDirPaths = File::directories($pathThemes);
        $themes = [];
        if (count($themeDirPaths) > 0) {
            foreach ($themeDirPaths as $key => $themeDirPath) {
                $themes[$key]['meta'] = json_decode(File::get($themeDirPath . '/theme.json'));
                $themes[$key]['dir'] = last(explode(DIRECTORY_SEPARATOR, $themeDirPath));
            }
        }
        return $themes;
    }

    public static function getTheme()
    {
        return Theme::getSetting('theme');
    }

    public static function updateTheme()
    {
        $data = request()->all();
        $setting = Setting::where('key', 'theme');
        $setting->update([
            'value' => $data['value']
        ]);
        return back()->with('alert', [
           'type' => 'success',
           'message' => 'Theme has been set successfully'
        ]);
    }
}