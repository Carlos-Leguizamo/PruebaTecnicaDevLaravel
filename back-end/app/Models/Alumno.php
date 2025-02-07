<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alumno extends Model
{
    protected $fillable = [
        'nombre',
        'fecha_nacimiento',
        'nombre_padre',
        'nombre_madre',
        'grado',
        'seccion',
        'fecha_ingreso'
    ];
}
