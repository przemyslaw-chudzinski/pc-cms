<?php


namespace App\Core\Contracts\Repositories;


use App\Article;

interface BlogRepository extends CrudRepository
{
    public function markImageAsSelected(Article $model, $imageID);

    public function removeImages(Article $model, $imageID);
}
