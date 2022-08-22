<?php

namespace App\Http\Controllers;
use App\Models\Users;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    function employee($id){
        $emp=Users::where('id',$id)->first();
        return response()->json($emp);
    }
}
