<?php


namespace App\Core\EloquentRepositories;

use App\Core\Contracts\Repositories\SettingRepository;
use App\Repositories\EloquentAbstractRepository;
use App\Setting;
use App\Traits\Repositories\CrudSupport;
use Illuminate\Database\Eloquent\Model;

class EloquentSetting extends EloquentAbstractRepository implements SettingRepository
{
    use CrudSupport;

    public function __construct(Setting $model)
    {
        parent::__construct($model);
    }

    /**
     * @param array $with
     * @param array $excluded_ids
     * @return mixed
     */
    public function all(array $with = [], array $excluded_ids = [])
    {
        return $this->model->with($with)
            ->when(count($excluded_ids) > 0, function ($query) use ($excluded_ids) {
                return $query->whereNotIn('id', $excluded_ids);
            })->get();
    }

    /**
     * @param Model $model
     * @param array $attributes
     * @return mixed
     */
    public function update(Model $model, array $attributes = [])
    {
        $value = array_get($attributes, 'value');
        if ($model->type === 'checkbox') {
            $model->value = array_has($attributes, 'value');
        } else $model->value = $value;
        $model->isDirty() ? $model->save() : null;
        return $model;
    }
}
