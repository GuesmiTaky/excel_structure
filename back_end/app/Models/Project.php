<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    // La relation avec l'entité "Catégorie"
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function imageRelations()
    {
        return $this->hasMany(Image::class);
    }
}
