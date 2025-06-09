<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutUsContent extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image_url',
        'journey_1_year',
        'journey_1_event',
        'journey_2_year',
        'journey_2_event',
        'journey_3_year',
        'journey_3_event',
        'team_1_name',
        'team_1_role',
        'team_1_image',
        'team_2_name',
        'team_2_role',
        'team_2_image',
        'team_3_name',
        'team_3_role',
        'team_3_image',
    ];
    
    
}

