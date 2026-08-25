<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'description',
        'category',
        'image',
        'tech_stack',
        'link'
    ];
}
