<?php


namespace App\Core\EloquentRepositories;


use App\Article;
use App\Core\Contracts\Repositories\BlogRepository;
use App\Core\Contracts\Services\FilesService;
use App\Repositories\EloquentAbstractRepository;
use App\Traits\Repositories\CrudSupport;
use App\Traits\Repositories\HasRemovableFiles;
use App\Traits\Repositories\HasSelectableFiles;
use Illuminate\Database\Eloquent\Model;

class EloquentBlog extends EloquentAbstractRepository implements BlogRepository
{
    use CrudSupport, HasRemovableFiles, HasSelectableFiles;

    /**
     * @var FilesService
     */
    private $filesService;

    public function __construct(Article $model, FilesService $filesService)
    {
        parent::__construct($model);
        $this->filesService = $filesService;
    }

    /**
     * @param Article $model
     * @param $imageID
     * @return Article
     */
    public function markImageAsSelected(Article $model, $imageID)
    {
        $model->images = $this->markFileAsSelected($model->images, (int) $imageID);
        $model->save();
        return $model;
    }

    /**
     * @param Article $model
     * @param $imageID
     * @return Article
     */
    public function removeImages(Article $model, $imageID)
    {
        $model->images = $this->removeFile($model->images, $imageID);
        $model->save();
        return $model;
    }

    /**
     * @param array $attributes
     * @param $authorID
     */
    public function create(array $attributes, $authorID)
    {
        $attributes['author_ID'] = $authorID;
        $categoryIds = array_get($attributes, 'category_ids');
        $article = $this->model->create($attributes);
        array_has($attributes, 'category_ids') ? $article->categories()->sync($categoryIds) : null;
    }

    /**
     * @param Model $article
     * @param array $attributes
     * @return Model
     */
    function update(Model $article, array $attributes = [])
    {
        $title = array_get($attributes, 'title');
        $categoryIds = array_get($attributes,'category_ids');

        $article->title = $title;
        $article->content = array_get($attributes,'content');
        $article->published = array_has($attributes, 'saveAndPublish');
        $article->meta_title = array_get($attributes,'meta_title');
        $article->meta_description = array_get($attributes,'meta_description');
        $article->allow_indexed = array_has($attributes,'allow_indexed');
        array_has($attributes,'category_ids') ? $article->categories()->sync($categoryIds) : $article->categories()->detach();
        $article->isDirty() ? $article->save() : null;
        return $article;
    }
}
