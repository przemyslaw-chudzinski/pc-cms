<?php


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
                if ($currentRouteName === $routeName) {
                    return $activeClassName;
                }
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
    function setActiveClassByActions(array $actionsArr, $activeClassName = 'active')
    {
        $currentRouteName = Route::currentRouteName();
        if (count($actionsArr) > 0) {
            foreach ($actionsArr as $actions) {
                if (count($actions) > 0) {
                    foreach ($actions as $action) {
                        if ($action['route_name'] === $currentRouteName) {
                            return $activeClassName;
                        }
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
     * @return \Illuminate\Config\Repository|mixed
     */
    function getRouteName(string $moduleName, string $actionName)
    {
        return config('admin.modules.' . $moduleName. '.actions.'. $actionName . '.route_name');
    }
}

if (!function_exists('getModuleActions')) {
    /**
     * @param string $moduleName
     * @return \Illuminate\Config\Repository|mixed
     */
    function getModuleActions(string $moduleName)
    {
        return config('admin.modules.' . $moduleName . '.actions' );
    }
}