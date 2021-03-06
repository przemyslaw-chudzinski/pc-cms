<?php

namespace App\Core\Contracts\Repositories;

use Illuminate\Database\Eloquent\Model;

interface CrudRepository
{
    function update(Model $model, array $attributes = []);

    function list($number = 10, array $with = [], array $excluded_ids = []);

    function all(array $with = [], array $excluded_ids = []);

    function getByAuthorID($authorID);

    function delete(Model $package);

    function create(array $attributes, $authorID);

    function updateSlug(Model $model, array $attributes = [], $defaultColName = 'slug');

    public function toggle(Model $model, $columnName);

    public function pushImage(Model $model, array $attributes, $uploadDir, $colName = 'images');

    public function removeImage(Model $model, $imageID, $colName = 'images');

    public function markImageAsSelected(Model $model, $imageID, $colName = 'images');
}
