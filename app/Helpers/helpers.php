<?php


use Illuminate\Config\Repository;
use Illuminate\Support\Facades\Route;

if (!function_exists('setActiveClass')) {
    /**
     * @param array $routeNames
     * @param string $activeClassName
     * @return null|string
     */
    function setActiveClass(array $routeNames, $activeClassName = 'active')
    {
        $currentRouteName = Route::currentRouteName();
        if (count($routeNames) > 0) {
            foreach ($routeNames as $routeName) {
                if ($currentRouteName === $routeName) return $activeClassName;
            }
        }
        return null;
    }
}

if (!function_exists('setActiveClassByActions')) {
    /**
     * @param array $actionsArr
     * @param string $activeClassName
     * @return null|string
     */
    function setActiveClassByActions(array $actionsArr = [], $activeClassName = 'active')
    {
        $currentRouteName = Route::currentRouteName();
        if (count($actionsArr) > 0) {
            foreach ($actionsArr as $actions) {
                if (count($actions) > 0) {
                    foreach ($actions as $action) {
                        if (isset($action['route_name']) && $action['route_name'] === $currentRouteName) return $activeClassName;
                    }
                }
            }
        }
        return null;
    }
}

if (!function_exists('getRouteName')) {
    /**
     * @param string $moduleName
     * @param string $actionName
     * @return Repository|mixed
     */
    function getRouteName(string $moduleName, string $actionName)
    {
        return config('admin.modules.' . $moduleName. '.actions.'. $actionName . '.route_name');
    }
}

if(!function_exists('getRouteUrl'))
{
    /**
     * @param string $moduleName
     * @param string $actionName
     * @param array $parameters
     * @return string
     */
    function getRouteUrl(string $moduleName, string $actionName, array $parameters = []): string
    {
        return url(route(getRouteName($moduleName, $actionName), $parameters));
    }
}

if (!function_exists('getModuleActions')) {
    /**
     * @param string $moduleName
     * @return Repository|mixed
     */
    function getModuleActions(string $moduleName)
    {
        return config('admin.modules.' . $moduleName . '.actions' );
    }
}

if (!function_exists('getModuleUploadDir')) {
    /**
     * @param string $moduleName
     * @return Repository|mixed
     */
    function getModuleUploadDir(string $moduleName)
    {
        return config('admin.modules.' . $moduleName . '.upload_dir');
    }
}

if (!function_exists('getImageUrl')) {
    /**
     * @param mixed $image
     * @param string|null $sizeName
     * @return mixed
     * @deprecated
     */
    function getImageUrl($image, $sizeName)
    {
        if ($sizeName === null) {
            return \Illuminate\Support\Facades\Storage::url($image['original']);
        }
        $res = $image['sizes'][$sizeName];
        if (!isset($res) || $res === null || empty($res)) {
            return \Illuminate\Support\Facades\Storage::url($image['original']);
        }
        return \Illuminate\Support\Facades\Storage::url($res);
    }
}

if(!function_exists('getSortUrl')) {
    function getSortUrl($order_by, $sort= false, $moduleName, $action = false)
    {
        $current_order_by = request()->query('order_by');
        $current_sort = request()->query('sort', 'desc');
        if ($current_order_by === $order_by) {
            $sort = $current_sort === 'asc' ? 'desc' : 'asc';
        }

        if ($sort === NULL || $sort === false) $sort = 'desc';
        if ($action === NULL || $action === false) $action = 'index';

        $url = url(route(getRouteName($moduleName, $action))).'?order_by='.$order_by.'&sort='.$sort;
        return $url;
    }
}

if(!function_exists('isLocalEnv'))
{
    /**
     * @return bool
     */
    function isLocalEnv(): bool
    {
        return env('APP_ENV') === 'local';
    }
}

if(!function_exists('adminAssets'))
{
    /**
     * @param $path
     * @param null $secure
     * @return string
     */
    function adminAssets($path, $secure = null): string
    {
        $currentTheme = config('admin.admin_theme');
        return asset('admin/'.$currentTheme.'/' . $path, $secure);
    }
}

if(!function_exists('getBackendPath'))
{
    /**
     * @return string
     */
    function getBackendPath()
    {
        return config('admin.admin_path');
    }
}
