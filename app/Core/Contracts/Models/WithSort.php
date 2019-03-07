<?php

namespace App\Core\Contracts\Models;

interface WithSort
{
    /**
     * @return array
     */
    public function getSortable(): array;
}
