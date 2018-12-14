<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;

trait Toggleable {

    public function toggle(Model $model, $columnName)
    {
        $model->{$columnName} = !(bool) $model->{$columnName};
        $model->isDirty() ? $model->save() : null;
        return $model;
    }

}