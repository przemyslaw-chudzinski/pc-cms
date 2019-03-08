<?php

namespace App\Core\EloquentRepositories;


use App\Core\Contracts\Repositories\SegmentRepository;
use App\Core\Contracts\Services\FilesService;
use App\Repositories\EloquentAbstractRepository;
use App\Segment;
use App\Traits\Repositories\CrudSupport;

/**
 * Class EloquentSegment
 * @package App\Core\EloquentRepositories
 */
class EloquentSegment extends EloquentAbstractRepository implements SegmentRepository
{
    use CrudSupport;

    /**
     * @var FilesService
     */
    private $filesService;

    public function __construct(Segment $model, FilesService $filesService)
    {
        parent::__construct($model);
        $this->filesService = $filesService;
    }
}
