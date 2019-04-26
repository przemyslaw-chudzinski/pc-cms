<?php


namespace App\Core\EloquentRepositories;


use App\Core\Contracts\Repositories\UserRepository;
use App\Repositories\EloquentAbstractRepository;
use App\Traits\Repositories\CrudSupport;
use App\User;

class EloquentUser extends EloquentAbstractRepository implements UserRepository
{
    use CrudSupport;

    public function __construct(User $model)
    {
        parent::__construct($model);
    }
}
