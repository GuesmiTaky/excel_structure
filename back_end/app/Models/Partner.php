<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    use HasFactory;

    // Les attributs du modèle
    protected $fillable = ['name'];

    /**
     * Get the image associated with the Partner.
     */
    public function imageRelation()
    {
        return $this->hasOne(Image::class);
    }
}
