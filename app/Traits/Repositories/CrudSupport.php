<?php

namespace App\Traits\Repositories;

use Illuminate\Database\Eloquent\Model;
use App\Facades\Project as ProjectModule;

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
    public function list($number = 10, array $with = [], array $excluded_ids = [])
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
     * @param array $with
     * @param array $excluded_ids
     * @return mixed
     */
    public function all(array $with = [], array $excluded_ids = [])
    {
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
            })->get();
        }

        return $this->model->when($order_by, function($query) use ($order_by, $sort) {
            return $query->orderBy($order_by, $sort);
        })->get();
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

    /**
     * @param Model $model
     * @param array $attributes
     * @param string $defaultColName
     * @return string
     */
    function updateSlug(Model $model, array $attributes = [], $defaultColName = 'slug')
    {
        $slug = array_has($attributes, $defaultColName) ? array_get($attributes, $defaultColName) : null;
        if ($slug) {
            $model->{$defaultColName} = str_slug($slug);
            $model->isDirty() && $model->save();
        }
        return $model->{$defaultColName};
    }

    /**
     * @param Model $model
     * @param $columnName
     * @return Model
     */
    public function toggle(Model $model, $columnName)
    {
        $model->{$columnName} = !(bool) $model->{$columnName};
        $model->isDirty() ? $model->save() : null;
        return $model;
    }

    /**
     * @param Model $model
     * @param array $attributes
     * @param string $colName
     * @return bool|null
     */
    // TODO: check;
    public function pushImage(Model $model, array $attributes = [], $colName = 'images')
    {
        $sentFiles = array_has($attributes, 'images') ? array_get($attributes, 'images') : null;

        if (!isset($sentFiles)) return null;

        $images = $model->{$colName};

        if (!$images) $images = [];

        $uploadedFiles = $this->filesService->uploadFiles($sentFiles, ProjectModule::uploadDir());

        $images[] = $uploadedFiles[0];

        $model->{$colName} = $images;

        return $model->isDirty() ? $model->save() : null;
    }

    /**
     * @param Model $model
     * @param array $attributes
     * @param string $colName
     * @return bool|null
     */
    // TODO: check
    public function removeImage(Model $model, array $attributes = [], $colName = 'images')
    {
        $imageID = array_has($attributes, 'imageID') ? (int) array_get($attributes, 'imageID') : null;

        if (!isset($imageID)) return null;

        $images = $model->{$colName};

        // TODO: Filter images by iageID !!!????
//        $filteredImages = array_map(function ($image) use ($imageID) {
//            return $imageID !== (int) $image['_id'] ? $image : false;
//        }, $images);
//
//        $model->{$colName} = array_filter($filteredImages, function ($img) {
//            return $img;
//        });

        return $model->isDirty() ? $model->save() : null;

    }
}
