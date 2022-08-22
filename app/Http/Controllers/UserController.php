<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Models\Users;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendInvitation;
use App\Mail\ResetPassMail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function register(Request $req){
        $validator = Validator::make($req->all(),[
            "name"=>"required|max:30|min:3|regex:/^[a-z ,.'-]+$/i",
            "email"=>"required|email|unique:user,email",
            "type"=>"required",
            "password"=>"required|min:8|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}+$/i",
            "conf_password"=>"required|min:8|same:password",
            "file"=>"required|mimes:jpg,png,jpeg|max:2048"
        ],
        [
            "name.required"=>"Provide your name",
            "name.regex"=>"Provide valid name",
            "password.regex"=>"Password must contain upper case,lower case,number and special characters",
            "conf_password.required"=>"Confirm your password",
            "conf_password.same"=>"Confirm password and password don't match"
        ]
         );
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }
        
        if($req->hasfile('file')){
            $orgName = time().'_'.$req->file->getClientOriginalName();
            $req->file->storeAs('public/pro_pics',$orgName);
            
            $user=new Users();
            $user ->name = $req->name;
            $user ->email =$req->email;
            $user ->password =$req->password;
            $user-> type = $req->type;
            $user -> pro_pic =$orgName;
            Mail::to(['redwanifty4389@gmail.com'])->send(new SendInvitation("Registration Confirmation",$req->name,$req->email,$req->type,$req->password));
            $user->save();
            return response()->json(
                [
                    "msg"=>"Registered Successfully",
                    "data"=>$user        
                ]
            );
        }
        return response()->json(["msg"=>"Registration failed"]);
    }
    function getUser(){
        $user=Users::whereNull('status')->get();
        return response()->json($user);
    }
    function updateUser(Request $req,$id){
        $validator = Validator::make($req->all(),[
            "name"=>"required|max:30|min:3|regex:/^[a-z ,.'-]+$/i",
            "type"=>"required",
            "file"=>"required|mimes:jpg,png,jpeg|max:2048"
        ],
        [
            "name.required"=>"Provide your name",
            "name.regex"=>"Provide valid name",
        ]
         );
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }
        if($req->hasfile('file')){
            $orgName = time().'_'.$req->file->getClientOriginalName();
            $req->file->storeAs('public/pro_pics',$orgName);
            
            $user=Users::where('id',$id)->first();
            $user ->name = $req->name;
            $user-> type = $req->type;
            $user -> pro_pic =$orgName;
            $user->update();
            return response()->json(
                [
                    "msg"=>"Update Successfully",
                    "data"=>$user        
                ]
            );
        }
        return response()->json(["msg"=>"Update failed"]);
    }
    function deleteUser($id){
        $user=Users::where('id',$id)->first();
        $user->status="Inactive";
        $user->update();
        return response()->json(
            [
                "msg"=>"Delete Successfull"
            ]
            );
    }
    function usersearch($key){
        $user=Users::where('name','LIKE',$key.'%')
        ->orWhere('id',$key)
        ->whereNull('status')->
        get();
        return response()->json($user);
    }
    function userDetails($id){
        $user=Users::where('id',$id)->first();
        return response()->json($user);
    }
    function changepass(Request $req){
        $validator = Validator::make($req->all(),[
            "email"=>"required|email|exists:user,email",
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
        $user=Users::where('email',$req->email)->first();
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
    function forgetpass(Request $req){
        $validator = Validator::make($req->all(),[
            "email"=>"required|email|exists:user,email"
            ],
        [
            "email.exists"=>"Email does not exists"
        ]
         );
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }
        $str=Str::random(6);
        $user=Users::where('email',$req->email)->first();
        $user->password=$str;
        Mail::to(['redwanifty4389@gmail.com'])->send(new ResetPassMail("Reset Password",$req->email,$str));
        $user->update();
        return response()->json(
            [
                "msg"=>"New password send to your email",
                "data"=>$user
            ]);
    }
    function changeProfilePic(Request $req,$id){
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
}
