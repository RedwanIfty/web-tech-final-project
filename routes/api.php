<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PharmacyController;
use App\Http\Controllers\DrugController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PharmacyDrugsController;
use App\Http\Controllers\SellController;
use App\Http\Controllers\EmployeeController;
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
Route::get('user',[UserController::class,'getUser'])->middleware('loggedadmin');
Route::post('user/update/{id}',[UserController::class,'updateUser'])->middleware('loggedadmin');
Route::post('user/delete/{id}',[UserController::class,'deleteUser'])->middleware('loggedadmin');
Route::get('user-search/{key}',[UserController::class,'usersearch'])->middleware('loggedadmin');
Route::get('user/details/{id}',[UserController::class,'userDetails'])->middleware('loggedadmin');
Route::post('/changepass',[UserController::class,'changepass'])->middleware('loggedadmin');
Route::post('/forgetpass',[UserController::class,'forgetpass']);
Route::post('/changeProfilePic/{id}',[UserController::class,'changeProfilePic']);//->middleware('loggedadmin');

Route::get('pharmacy',[PharmacyController::class,'getPharmacy'])->middleware('loggedadmin');
Route::post('add/pharmacy',[PharmacyController::class,'addPharmacy'])->middleware('loggedadmin');
Route::post('pharmacy/update/{id}',[PharmacyController::class,'updatePharmacy'])->middleware('loggedadmin');
Route::post('pharmacy/delete/{id}',[PharmacyController::class,'deletePharmacy'])->middleware('loggedadmin');
Route::get('pharmacy-search/{key}',[PharmacyController::class,'searchPharmacy']);//->middleware('loggedadmin');

Route::get('drugs',[DrugController::class,'getDrugs'])->middleware('loggedadmin');
Route::post('add/drugs',[DrugController::class,'addDrugs'])->middleware('loggedadmin');
Route::post('drugs/update/{id}',[DrugController::class,'updateDrugs'])->middleware('loggedadmin');
Route::post('drugs/delete/{id}',[DrugController::class,'deleteDrugs'])->middleware('loggedadmin');
Route::get('drugs-search/{key}',[DrugController::class,'searchDrugs']);//->middleware('loggedadmin');

Route::post('/login',[LoginController::class,'login']);
Route::post('/logout',[LoginController::class,'logout']);

Route::get('/pharmacy/drugs/{id}',[PharmacyDrugsController::class,'pharmacyDrugs'])->middleware('loggedadmin');
Route::get('/drugs/pharmacy/{id}',[PharmacyDrugsController::class,'drugsPharmacy'])->middleware('loggedadmin');
Route::post('/pharmacy/drugs/{id}',[PharmacyDrugsController::class,'pharmacyDrugsAdd'])->middleware('loggedadmin');
Route::post('/drugs/pharmacy/{id}',[PharmacyDrugsController::class,'drugsPharmacyAdd']);
Route::get('/employee/{id}',[EmployeeController::class,'employee'])->middleware('loggedemployee');


Route::get('/drugs/sells',[SellController::class,'getSells']);//->middleware('loggedadmin');
