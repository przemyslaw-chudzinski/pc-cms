<?php


namespace App\Core\EloquentRepositories;


use App\BlogCategory;
use App\Core\Contracts\Repositories\BlogCategoryRepository;
use App\Repositories\EloquentAbstractRepository;
use App\Traits\Repositories\CrudSupport;

class EloquentBlogCategory extends EloquentAbstractRepository implements BlogCategoryRepository
{
    use CrudSupport;

    public function __construct(BlogCategory $model)
    {
        parent::__construct($model);
    }
}
