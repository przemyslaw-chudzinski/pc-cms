<?php

namespace App\Core;


class MassActions
{
    public function setMassActions($module_name = '', $action_route_name = null, array $args = [])
    {
        if ($module_name === '') throw new Exception('Module name is required');
        if ($action_route_name === null) {
            $action_route_name = 'mass_actions';
        }
        return view('admin.material_theme.components.massActions.massActions', [
            'args' => $args,
            'module_name' => $module_name,
            'action_route_name' => $action_route_name
        ]);
    }
}
