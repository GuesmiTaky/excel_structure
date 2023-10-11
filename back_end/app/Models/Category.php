<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Les attributs du modèle
    protected $fillable = ['name'];

    // Les relations avec les autres entités du modèle
    public function projet()
    {
        return $this->hasMany(Project::class);
    }

    /**
     * Get the image associated with the category.
     */
    public function imageRelation()
    {
        return $this->hasOne(Image::class);
    }
}
