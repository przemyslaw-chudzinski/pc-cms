<?php

use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $modules = config('admin.modules');
        $permissions_admin = [];
        $permissions_user = [];
        foreach ($modules as $name => $module) {
            $permissions_admin[$name] = [];
            foreach ($module['actions'] as $action) {
                $permissions_admin[$name]['permissions'][] = [
                    'route' => $action['route_name'],
                    'allow' => true
                ];
            }
        }
        $data = [
           'name' => 'admin',
           'display_name' => 'Administrator',
           'permissions' => json_encode($permissions_admin),
           'allow_remove' => false
        ];
        \App\Role::create($data);

        foreach ($modules as $name => $module) {
            $permissions_user[$name] = [];
            foreach ($module['actions'] as $action) {
                $permissions_user[$name]['permissions'][] = [
                    'route' => $action['route_name'],
                    'allow' => false
                ];
            }
        }
        $data2 = [
            'name' => 'user',
            'display_name' => 'Użytkownik',
            'permissions' => json_encode($permissions_user)
        ];
        \App\Role::create($data2);
    }
}
