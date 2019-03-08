<?php

namespace App\Traits\Models;

/**
 * Trait HasImages
 * @package App\Traits\Models
 */
trait HasImages
{
    public function getImagesAttribute($images)
    {
        return json_decode($images);
    }

    public function setImagesAttribute($images)
    {
        $this->attributes['images'] = json_encode($images, true);
    }
}
