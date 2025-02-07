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
            'grado' => 'required|integer|max:255',
            'seccion' => 'required|string|max:255',
            'fecha_ingreso' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }

        try {
            $alumno = Alumno::create($request->all());

            return response()->json([
                'message' => 'Alumno creado exitosamente',
                'alumno' => $alumno
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el alumno',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function showByGrado($grado) {
        $alumnos = Alumno::where('grado', $grado)->get();

        if ($alumnos->isEmpty()) {
            return response()->json([
                'message' => "No se encontraron alumnos en el grado {$grado}"
            ], 404);
        }

        return response()->json([
            'message' => "Lista de alumnos en el grado {$grado}",
            'alumnos' => $alumnos
        ], 200);
    }
}
