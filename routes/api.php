<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

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
