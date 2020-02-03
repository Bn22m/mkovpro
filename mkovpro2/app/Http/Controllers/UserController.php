<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      echo "Ref#: ".$time.", <br><h2>User Index: ".$date."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'users' => User::all(),
      ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      echo "Ref#: ".$time.", <br><h2>Done: User Saved ".$date."</h2><br><hr>";
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      echo "Ref#: ".$time.", <br><h2>User# ".$id.", View: ".$date."</h2><br><hr>";
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      echo "Ref#: ".$time.", <br><h2>User#: ".$id.", updated: ".$date."</h2><br><hr>";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      echo "Ref#: ".$time.", <br><h2>User# ".$id.", deleted: ".$date."</h2><br><hr>";
    }

    public function register(Request $request)
    {
        echo "Register:";
        echo $request;
        $time = time();
        $date = date("Y-m-d H:i:s", $time);
        echo "Ref#: ".$time.", <br><h2>User: ".$request.", Registerd: ".$date."</h2><br><hr>";
        $temp4 = $this->hashData($request->password, $request->email);
        $options = ['cost' => 8,];
        $passwd = password_hash($temp4, PASSWORD_BCRYPT, $options);
        echo $passwd;
      return 0;
    }

    public function login(Request $request)
    {
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      echo "Ref#: ".$time.", <br><h2>User Login: ".$date."</h2><br><hr>";
      $credentials = $request->only(['email', 'password']);


      return 0;
    }

    public function logout(Request $request)
    {
      echo $request;
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      echo "Ref#: ".$time.", <br><h2>User Logout: ".$date."</h2><br><hr>";
        return response()->json(['message'=>'logged out']);
    }

    private function hashData($x, $y){
      $temp = "temp1@";
      $temp .= $x;
      $temp .= $y;
      $temp .= $y[1];
      $temp .= $x[1];
      $temp2 = hash('sha256', $temp);
      return $temp2;
    }

}
