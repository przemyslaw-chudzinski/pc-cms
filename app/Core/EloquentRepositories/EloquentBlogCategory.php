<?php


namespace App\Core\EloquentRepositories;


use App\Core\Contracts\Repositories\BlogCategoryRepository;
use App\Repositories\EloquentAbstractRepository;
use App\Traits\Repositories\CrudSupport;

class EloquentBlogCategoryRepository extends EloquentAbstractRepository implements BlogCategoryRepository
{
    use CrudSupport;
}
