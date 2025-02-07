<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlumnoController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::middleware(['api_key'])->group(function () {
    Route::post('/crear-alumno', [AlumnoController::class, 'store']);
    Route::get('/consultar-alumno/{grado}', [AlumnoController::class, 'showByGrado']);
});

