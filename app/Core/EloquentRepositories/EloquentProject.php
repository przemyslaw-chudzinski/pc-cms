<?php

namespace App\Core\EloquentRepositories;

use App\Core\Contracts\Repositories\ProjectRepository;
use App\Core\Contracts\Services\FilesService;
use App\Project;
use App\Repositories\EloquentAbstractRepository;
use App\Traits\Repositories\CrudSupport;
use App\Traits\Repositories\HasRemovableFiles;
use App\Traits\Repositories\HasSelectableFiles;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EloquentProject
 * @package App\Core\EloquentRepositories
 */
class EloquentProject extends EloquentAbstractRepository implements ProjectRepository
{
    use CrudSupport, HasSelectableFiles, HasRemovableFiles;

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
    function update(Model $project, array $attributes = [])
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
}
