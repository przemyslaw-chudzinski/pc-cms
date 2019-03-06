<?php

namespace App\Core;


class MassActions
{
    public function setMassActions($module_name, $action_route_name = null, array $args = [])
    {
        if ($action_route_name === null) $action_route_name = 'mass_actions';

        return view('admin::components.massActions.massActions', [
            'args' => $args,
            'module_name' => $module_name,
            'action_route_name' => $action_route_name
        ]);
    }

    public function setHeaderActions($module_name, $action_route_name = null, array $args = [])
    {
        if ($action_route_name === null) $action_route_name = 'mass_actions';

        return view('admin::components.massActions.actionsHeader', [
            'args' => $args,
            'module_name' => $module_name,
            'action_route_name' => $action_route_name
        ]);
    }
}
