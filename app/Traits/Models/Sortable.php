<?php

namespace App\Traits\Models;

/**
 * Trait Sortable
 * @package App\Traits\Models
 */
trait Sortable
{
    /**
     * @return array
     */
    public function getSortable(): array
    {
        return $this->sortable;
    }
}
