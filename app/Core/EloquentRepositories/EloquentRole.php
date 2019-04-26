<?php


namespace App\Core\EloquentRepositories;


use App\Core\Contracts\Repositories\RoleRepository;
use App\Repositories\EloquentAbstractRepository;
use App\Role;
use App\Traits\Repositories\CrudSupport;
use Illuminate\Database\Eloquent\Model;

class EloquentRole extends EloquentAbstractRepository implements RoleRepository
{
    use CrudSupport;

    public function __construct(Role $model)
    {
        parent::__construct($model);
    }

    /**
     * @param Role $model
     * @param $permissions
     * @return Role|Model
     */
    public function updatePermissions(Role $model, $permissions)
    {
        $model->permissions = $permissions;
        $model->isDirty() ? $model->save() : null;
        return $model;
    }
}
