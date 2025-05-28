<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomepageContent extends Model
{
    protected $fillable = [
        'hero_title',
        'hero_subtitle',
        'hero_button_text',
        'hero_background_url',
        'section1_title',
        'card1_title',
        'card1_image',
        'card1_description',
        'card2_title',
        'card2_image',
        'card2_description',
        'card3_title',
        'card3_image',
        'card3_description',
        'card4_title',
        'card4_image',
        'card4_description',
    ];
}
