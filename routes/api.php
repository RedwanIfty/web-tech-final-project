<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PharmacyController;
use App\Http\Controllers\DrugController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/user/register',[UserController::class,'register']);
Route::get('user',[UserController::class,'getUser']);
Route::post('user/update/{id}',[UserController::class,'updateUser']);
Route::post('user/delete/{id}',[UserController::class,'deleteUser']);

Route::get('pharmacy',[PharmacyController::class,'getPharmacy']);
Route::post('add/pharmacy',[PharmacyController::class,'addPharmacy']);
Route::post('pharmacy/update/{id}',[PharmacyController::class,'updatePharmacy']);
Route::post('pharmacy/delete/{id}',[PharmacyController::class,'deletePharmacy']);

Route::get('drugs',[DrugController::class,'getDrugs']);
Route::post('add/drugs',[DrugController::class,'addDrugs']);
Route::post('drugs/update/{id}',[DrugController::class,'updateDrugs']);
Route::post('drugs/delete/{id}',[DrugController::class,'deleteDrugs']);
