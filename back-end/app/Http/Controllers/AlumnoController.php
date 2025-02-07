<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Models\Alumno;

use Illuminate\Http\Request;

class AlumnoController extends Controller
{
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'fecha_nacimiento' => 'required|date',
            'nombre_padre' => 'required|string|max:255',
            'nombre_madre' => 'required|string|max:255',
            'grado' => 'required|string|max:255',
            'seccion' => 'required|string|max:255',
            'fecha_ingreso' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $alumno = Alumno::create($request->all());
        return response()->json(['message' => 'Alumno creado exitosamente', 'alumno' => $alumno], 201);
    }

    // Método para consultar alumnos por grado
    public function showByGrado($grado) {
        $alumnos = Alumno::where('grado', $grado)->get();
        return response()->json(['alumnos' => $alumnos], 200);
    }
}
