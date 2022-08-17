<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\PharmacyDrugs;
use App\Models\Pharmacy;
use App\Models\Drug;

class PharmacyDrugsController extends Controller
{
    function pharmacyDrugs($id){
        $pd=Pharmacy::find($id)->drug;
        return response()->json($pd);
    }
    function pharmacyDrugsAdd(Request $req,$id){
        $validator = Validator::make($req->all(),[
            "name"=>"required",
            "formula"=>"required",
            "price"=>"required|numeric",
            "available"=>"required|numeric",
        ],
        [
            "name.required"=>"Please provide drugs name",
            "name.unique"=>"Already exists"
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }
        $d=Drug::where('name',$req->name)->first();
        if($d===null){
            $drug=new Drug();
            $drug->name=$req->name; 
            $drug->formula=$req->formula;
            $drug->price=$req->price;
            $drug->available=$req->available;
            $drug->save();
    }
        //return response()->json($d->id);
       // $pd=new PharmacyDrugs();
       $pharmacydrugs=new PharmacyDrugs();
       $pharmacydrugs->drug_id=$d->id;
       $pharmacydrugs->pharmacy_id=$id;
       $pharmacydrugs->save();
       return response()->json([
        "msg"=>"Drugs add successfully",
        "data"=>$pharmacydrugs
    ]);
    }
}
