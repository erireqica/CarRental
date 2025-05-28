<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomepageContent extends Model
{
    protected $fillable = [
        'section',
        'title',
        'subtitle',
        'image_url',
    ];
}

