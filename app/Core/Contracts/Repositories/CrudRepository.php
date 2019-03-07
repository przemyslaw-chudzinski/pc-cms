<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Model;

interface CrudRepository
{
    function update(Model $model, array $attributes);

    function all($number = 10, array $with = [], array $excluded_ids = []);

    function getByAuthorID($authorID);

    function delete(Model $package);

    function create(array $attributes, $authorID);
}
