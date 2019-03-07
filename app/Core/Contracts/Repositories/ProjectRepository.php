<?php

namespace App\Core\Contracts\Repositories;

use App\Contracts\CrudRepository;
use Illuminate\Database\Eloquent\Model;

interface ProjectRepository extends CrudRepository
{
    function updateSlug(Model $model, array $attributes = [], $defaultColName = 'slug');

    public function toggle(Model $model, $columnName);

    public function pushImage(Model $model, array $attributes = [], $colName = 'images');

    public function removeImage(Model $model, array $attributes = [], $colName = 'images');
}
