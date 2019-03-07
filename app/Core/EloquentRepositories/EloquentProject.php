<?php

namespace App\Core\EloquentRepositories;

use App\Core\Contracts\Repositories\ProjectRepository;
use App\Core\Contracts\Services\FilesService;
use App\Project;
use App\Repositories\EloquentAbstractRepository;
use App\Traits\Repositories\CrudSupport;
use Illuminate\Database\Eloquent\Model;
use App\Facades\Project as ProjectModule;

class EloquentProject extends EloquentAbstractRepository implements ProjectRepository
{
    use CrudSupport;

    /**
     * @var FilesService
     */
    private $filesService;

    public function __construct(Project $model, FilesService $filesService)
    {
        parent::__construct($model);
        $this->filesService = $filesService;
    }

    /**
     * @param Model $project
     * @param array $attributes
     * @return Model
     */
    function update(Model $project, array $attributes)
    {
        $title = array_get($attributes, 'title');
        $categoryIds = array_get($attributes,'category_ids');

        $project->title = $title;

        $project->content = array_get($attributes,'content');
        $project->published = array_has($attributes, 'saveAndPublish');
        $project->meta_title = array_get($attributes,'meta_title');
        $project->meta_description = array_get($attributes,'meta_description');
        $project->allow_indexed = array_has($attributes,'allow_indexed');
        array_has($attributes,'category_ids') ? $project->categories()->sync($categoryIds) : $project->categories()->detach();
        $project->isDirty() ? $project->save() : null;
        return $project;
    }

    /**
     * @param array $attributes
     * @param $authorID
     */
    public function create(array $attributes, $authorID)
    {
        $title = array_get($attributes, 'title');
        $slug = array_get($attributes, 'slug');
        $categoryIds = array_get($attributes, 'category_ids');
        $project = $this->model->create([
            'title' => $title,
            'slug' => isset($slug) ? str_slug($slug) : str_slug($title),
            'content' => array_get($attributes, 'content'),
            'published' => array_has($attributes, 'saveAndPublish'),
            'meta_title' => array_get($attributes, 'meta_title'),
            'meta_description' => array_get($attributes, 'meta_description'),
            'allow_indexed' => array_has($attributes, 'allow_indexed'),
            'author_ID' => $authorID
        ]);
        array_has($attributes, 'category_ids') ? $project->categories()->sync($categoryIds) : null;
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
