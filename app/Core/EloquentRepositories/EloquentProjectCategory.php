<?php

namespace App\Core\EloquentRepositories;

use App\Core\Contracts\Repositories\ProjectCategoryRepository;
use App\Core\Contracts\Services\FilesService;
use App\ProjectCategory;
use App\Repositories\EloquentAbstractRepository;
use App\Traits\Repositories\CrudSupport;
use App\Traits\Repositories\HasRemovableFiles;
use App\Traits\Repositories\HasSelectableFiles;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EloquentProjectCategory
 * @package App\Core\EloquentRepositories
 */
class EloquentProjectCategory extends EloquentAbstractRepository implements ProjectCategoryRepository
{
    use CrudSupport, HasSelectableFiles, HasRemovableFiles;

    /**
     * @var FilesService
     */
    protected $filesService;

    public function __construct(ProjectCategory $model, FilesService $filesService)
    {
        parent::__construct($model);
        $this->filesService = $filesService;
    }

    /**
     * @param array $attributes
     * @param $authorID
     */
    public function create(array $attributes, $authorID)
    {
        $name = array_get($attributes,'name');
        $this->model->create([
            'name' => $name,
            'slug' => str_slug($name),
            'description' => array_get($attributes,'description'),
            'published' => array_has($attributes,'saveAndPublish'),
            'author_ID' => $authorID
        ]);
    }

    /**
     * @param Model $model
     * @param array $attributes
     * @return Model
     */
    public function update(Model $model, array $attributes = [])
    {
        $name = array_get($attributes,'name');
        $model->name = $name;
        $model->description = array_get($attributes,'description');
        $model->published = array_has($attributes, 'saveAndPublish');
        $model->isDirty() ? $model->save() : null;
        return $model;
    }
}
