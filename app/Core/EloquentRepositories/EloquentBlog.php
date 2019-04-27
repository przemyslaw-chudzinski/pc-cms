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
     * @param array $attributes
     * @param $authorID
     * @return mixed
     */
    public function create(array $attributes, $authorID)
    {
        $attributes['author_ID'] = $authorID;
        $categoryIds = array_get($attributes, 'category_ids');
        $article = $this->model->create($attributes);
        return array_has($attributes, 'category_ids') ? $article->categories()->sync($categoryIds) : null;
    }

    /**
     * @param Model $article
     * @param array $attributes
     * @return Model
     */
    function update(Model $article, array $attributes = [])
    {
        $categoryIds = array_get($attributes,'category_ids');

        $article->title = array_get($attributes, 'title');;
        $article->content = array_get($attributes,'content');
        $article->published = array_get($attributes, 'published');
        $article->meta_title = array_get($attributes,'meta_title');
        $article->meta_description = array_get($attributes,'meta_description');
        $article->allow_indexed = array_get($attributes,'allow_indexed');
        $article->allow_comments = array_get($attributes, 'allow_comments');

        array_has($attributes,'category_ids') ? $article->categories()->sync($categoryIds) : $article->categories()->detach();

        $article->isDirty() ? $article->save() : null;
        return $article;
    }
}
