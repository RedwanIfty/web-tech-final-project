<?php

namespace App\Http\Controllers;
use App\Models\Sell;
use Illuminate\Http\Request;

class SellController extends Controller
{
    function getSells(){
        $sell=Sell::whereNull('status')->get();
        return response()->json($sell);
    }   
}
