<?php


namespace App\Core\EloquentRepositories;


use App\BlogCategory;
use App\Core\Contracts\Repositories\BlogCategoryRepository;
use App\Core\Contracts\Services\FilesService;
use App\Repositories\EloquentAbstractRepository;
use App\Traits\Repositories\CrudSupport;
use App\Traits\Repositories\HasRemovableFiles;
use App\Traits\Repositories\HasSelectableFiles;

class EloquentBlogCategory extends EloquentAbstractRepository implements BlogCategoryRepository
{
    use CrudSupport, HasSelectableFiles, HasRemovableFiles;

    /**
     * @var FilesService
     */
    protected $filesService;

    public function __construct(BlogCategory $model, FilesService $filesService)
    {
        parent::__construct($model);

        $this->filesService = $filesService;
    }
}
