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
        'card1_type',
    
        'card2_title',
        'card2_image',
        'card2_type',
    
        'card3_title',
        'card3_image',
        'card3_type',
    
        'card4_title',
        'card4_image',
        'card4_description',
    
        'card5_title',
        'card5_image',
        'card5_description',
    
        'card6_title',
        'card6_image',
        'card6_description',
    
        'card7_title',
        'card7_image',
        'card7_description',
    ];
}
