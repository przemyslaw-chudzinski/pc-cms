<?php


namespace App\Core\Contracts\Repositories;


use App\Role;

interface RoleRepository extends CrudRepository
{
    public function updatePermissions(Role $model, $permissions);
}
