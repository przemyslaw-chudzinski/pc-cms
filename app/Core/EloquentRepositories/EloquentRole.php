<?php


namespace App\Core\EloquentRepositories;


use App\Core\Contracts\Repositories\RoleRepository;
use App\Repositories\EloquentAbstractRepository;
use App\Traits\Repositories\CrudSupport;

class EloquentRole extends EloquentAbstractRepository implements RoleRepository
{
    use CrudSupport;
}
