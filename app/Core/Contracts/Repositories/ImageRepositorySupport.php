<?php


namespace App\Core\Contracts\Repositories;


use Illuminate\Database\Eloquent\Model;

interface ImageRepositorySupport
{
    public function markImageAsSelected(Model $model, $imageID);

    public function removeImage(Model $model, $imageID);
}
