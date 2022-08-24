<?php

namespace App\Http\Controllers;
use App\Models\Users;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    function employee($id){
        $emp=Users::where('id',$id)->first();
        return response()->json($emp);
    }
    function changepassEmp(Request $req,$id){
        $validator = Validator::make($req->all(),[
            "current_password"=>"required",
            "password"=>"required|min:8|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}+$/i",
            "conf_password"=>"required|min:8|same:password",
        ],
        [
            "password.regex"=>"Password must contain upper case,lower case,number and special characters",
            "conf_password.required"=>"Confirm your password",
            "conf_password.same"=>"Confirm password and password don't match"
        ]
         );
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }
        $user=Users::where('id',$id)->first();
        if($user->password != $req->current_password){
            return response()->json(["msg"=>"Password doesn't match with current password"]);
        }
        $user->password=$req->password;
        $user->update();
        return response()->json(
            ["msg"=>"Password updated successfull",
            "data"=>$user]
        );
    }
    function changeProfilePicEmp(Request $req,$id){
        $validator = Validator::make($req->all(),[
            "file"=>"required|mimes:jpg,png,jpeg|max:2048"
        ]
         );
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }
        if($req->hasfile('file')){
            $orgName = time().'_'.$req->file->getClientOriginalName();
            $req->file->storeAs('public/pro_pics',$orgName);
            
            $user=Users::where('id',$id)->first();
            $user -> pro_pic =$orgName;
            $user->update();
            return response()->json(
                [
                    "msg"=>"Profile Picture Change Successfully",
                    "data"=>$user        
                ]
            );
        }
        return response()->json(["msg"=>"Update failed"]);

    }
    function employeeDetails($id){
        $user=Users::where('id',$id)->first();
        return response()->json($user);
    }
}
