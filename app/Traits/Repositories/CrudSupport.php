<?php

namespace App\Traits\Repositories;

use Illuminate\Database\Eloquent\Model;

/**
 * Trait CrudSupport
 * @package App\Traits
 */
trait CrudSupport
{
    /**
     * @param int $number
     * @param array $with
     * @param array $excluded_ids
     * @return mixed
     */
    public function all($number = 10, array $with = [], array $excluded_ids = [])
    {
        if ($number === false || $number === NULL ) $number = 10;

        $order_by = request()->query('order_by');
        $sort = request()->query('sort');

        if (!$this->validateOrderByField($order_by)) {
            $order_by = $this->model->getSortable()[0];
            $sort = 'asc';
        }

        if (count($with) > 0) {
            return $this->model->with($with)->when($order_by, function($query) use ($order_by, $sort) {
                    return $query->orderBy($order_by, $sort);
                })->when(count($excluded_ids) > 0, function ($query) use ($excluded_ids) {
                    return $query->whereNotIn('id', $excluded_ids);
                })->paginate($number);
        }

        return $this->model->when($order_by, function($query) use ($order_by, $sort) {
            return $query->orderBy($order_by, $sort);
        })->paginate($number);
    }

    /**
     * @param string $order_by
     * @return bool
     */
    private function validateOrderByField($order_by = '')
    {
        if ($order_by === '') return false;
        foreach ($this->model->getSortable() as $item) {
            if ($order_by === $item) return true;
        }
        return false;
    }

    /**
     * @param array $attributes
     * @param $authorID
     * @return mixed
     */
    function create(array $attributes, $authorID)
    {
        $attributes['author_ID'] = $authorID;
        return $this->model->create($attributes);
    }

    /**
     * @param Model $model
     * @param array $attributes
     * @return Model
     */
    function update(Model $model, array $attributes = [])
    {
        $model->update($attributes);
        return $model;
    }

    /**
     * @param Model $model
     * @return Model
     * @throws \Exception
     */
    function delete(Model $model)
    {
        $model->delete();
        return $model;
    }

    /**
     * @param $authorID
     * @return mixed
     */
    function getByAuthorID($authorID)
    {
        return $this->model->where('author_ID', $authorID)->get()->first();
    }
}
