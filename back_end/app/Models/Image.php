<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    // Les attributs du modèle
    protected $fillable = ['project_id', 'partner_id','image_url'];

    // Les relations avec les autres entités du modèle
    public function projets()
    {
        return $this->hasOne(Projet::class);
    }

    // Les relations avec les autres entités du modèle
    public function partners()
    {
        return $this->hasOne(Partner::class);
    }
}
