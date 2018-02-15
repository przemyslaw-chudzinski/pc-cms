<?php

namespace App\Core\Services;

use App\Article;
use App\BlogCategory;
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

            return view('themes.' . $theme . '.page-templates.' . $page->template, ['page' => $page]);

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

    public static function getPageTemplates()
    {
        $pageTemplatesDir = base_path('resources' . DIRECTORY_SEPARATOR . 'views' . DIRECTORY_SEPARATOR . 'themes' . DIRECTORY_SEPARATOR . self::getTheme() . DIRECTORY_SEPARATOR . 'page-templates');
        if (!is_dir($pageTemplatesDir)) {
            return [];
        }
        $pageTemplatesFiles = File::allFiles($pageTemplatesDir);
        $templates = [];
        if (count($pageTemplatesFiles) > 0) {
            foreach ($pageTemplatesFiles as $pageTemplatesFile) {
                $templates[] = array_first(explode('.', $pageTemplatesFile->getFileName()));
            }
        }
        return $templates;
    }

    public static function getSingleArticleView($slug = '')
    {
        if ($slug === '') {

            return view('themes.index');

        }

        /* Theme directory name */
        $theme = self::getTheme();

        if ($theme === null || $theme === '') {
            throw new \Exception('Theme does not exits');
        }

        $article = Article::with('categories')
            ->where([
                ['published', true],
                ['slug', $slug]
            ])
            ->get()
            ->first();

        if ($article) {

            return view('themes.' . $theme . '.page-templates.blog.blog-single', ['article' => $article]);

        }

        return '404';

    }

    public static function showArticlesViewByCategory($slug = '')
    {
        if ($slug === '') {
            return redirect('blog');
        }

        /* Theme directory name */
        $theme = self::getTheme();

        $category = BlogCategory::with('articles')
            ->where([
            ['published', true],
            ['slug', $slug]
        ])
            ->get()
            ->first();

        return view('themes.' . $theme . '.page-templates.blog.articles-by-category', ['category' => $category]);
    }

    public static function getMaintenanceMode()
    {
        $maintenanceMode = Theme::getSetting('maintenance_mode');

        if ($maintenanceMode) {

            /* Theme directory name */
            $theme = Theme::getSetting('theme');

            return view('themes.' . $theme . '.page-templates.maintenance.maintenance');
        }

        return redirect(url('/'));
    }
}