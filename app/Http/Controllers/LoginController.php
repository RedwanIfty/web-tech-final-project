<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Token;
use App\Models\Users;
use Datetime;

class LoginController extends Controller
{
    function login(Request $req){
        $validator = Validator::make($req->all(),[
            "email"=>"required|exists:user,email",
            "pass"=>"required"
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }
        $user=Users::where('email',$req->email)
                    ->where('password',$req->pass)->first();
      //ss  return $user->Role;
        if($user){
            $key = Str::random(67);
            $token = new Token();
            $token->tkey = $key;
            $token->user_id = $user->id;
            $token->Role=$user->type;
            $token->created_at = new Datetime();
            $token->save();
            return response()->json($token);
        }
        return response()->json(["msg"=>"Email or password is invalid"],422);
    }
    function logout(Request $req){
        $tk = $req->token;
        $token = Token::where('tkey',$tk)->first();
        $token->expired_at = new Datetime();
        $token->save();
        return response()->json(["msg"=>"Logged out"]);
    }
}
