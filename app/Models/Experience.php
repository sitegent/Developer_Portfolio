<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = ['year', 'role', 'company', 'description', 'sort_order'];
}
