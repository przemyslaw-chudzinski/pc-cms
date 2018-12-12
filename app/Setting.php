<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;

class Setting extends Model
{
    use ModelTrait;

    protected $fillable = [
        'key',
        'value',
        'type',
        'position',
        'description'
    ];

}
