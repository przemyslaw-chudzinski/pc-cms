<?php

namespace App\Core\Contracts\Repositories;


use Illuminate\Database\Eloquent\Model;

interface ProjectRepository extends CrudRepository
{
    public function markImageAsSelected(Model $model, $imageID);

    public function removeImages(Model $model, $imageID);
}
