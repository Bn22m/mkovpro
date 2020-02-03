<?php

namespace App\Http\Controllers;
session_start();

use Illuminate\Http\Request;
use App\Registration;
use App\Http\Resources\RagistrationResource;

class RegistrationController extends Controller
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
      echo "Ref#: ".$time.", <br><h2>Register Index: ".$date."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'register' => Register::all(),
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
      echo "Ref#: ".$time.", <br><h2>Register Store: ".$date."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'register' => Register::all(),
      ], 200);
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
      echo "Ref#: ".$time.", <br><h2>Register Show: ".$id."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'register' => Register::all(),
      ], 200);
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
      echo "Ref#: ".$time.", <br><h2>Register Update: ".$id."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'register' => Register::all(),
      ], 200);
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
      echo "Ref#: ".$time.", <br><h2>Register Destroy: ".$id."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'register' => Register::all(),
      ], 200);
    }

    public function registerUser(Request $request)
    {
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      echo "Ref#: ".$time.", <br><h2>Register Register: ".$date."</h2><br><hr>";
      //echo $request;
      //echo "<br>";
      //echo $request->name;
      //echo "<br>";
      //echo $request->email;
      //echo "<br>";
      exit();
      return response()->json([
        'error' => false,
        'register' => Register::all(),
      ], 200);
    }

    /*
    *
    * http://127.0.0.1:8000/api/register?data={"name": "Awesome", "surname": "Awesome4", "email": "awesome@awe.co", "password": "****", "address": "24 Cool Str, JHB", "0": "0"}
    */
    public function register(Request $request)
    {
      $info = "info: ";
      $info .= $_SERVER['HTTP_HOST'].", ";
      $data = $request->data;
      $datad = json_decode($data);
      //echo "<br>";
      //echo "<h2>".$datad->name."</h2>";
      //echo "<br>";
      //echo "Register:";
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      //echo "Ref#: ".$time.", <br><h2>User: ".$request.", Registerd: ".$date."</h2><br><hr>";
      //$temp4 = $this->hashData($datad->password, trim($datad->email));
      $email = trim($datad->email);
      //echo $email;
      $temp4 = $this->hashData($datad->password, $email);
      $options = ['cost' => 8,];
      $passwd = password_hash($temp4, PASSWORD_BCRYPT, $options);
      $registration = Registration::create([
        'account' => $this->account($datad->name),
        'name' => trim($datad->name),
        'surname' => trim($datad->surname),
        'utype' => "Customer",
        'email' => trim($datad->email),
        'verified' => NULL,
        'address' => trim($datad->address),
        'password' => $passwd,
        'created' => $date,
        'modified' => $date,
        'comments' => $date,
        'reference' => $time,
      ]);
      $reg = $registration["email"];
      $ref2 = 0;
      $ref1 = $time.$reg;
      return response()->json(['ref3' => ['ref1'=> $ref1, 'ref2' => $ref2, 'info' => $info, 'res0' => 'res0']],200);
    }

    /*
    *
    * http://127.0.0.1:8000/api/register/login?data={"email": "awesome@awe.co", "password": "****", "0": "0"}
    */
    public function login(Request $request)
    {
      $info = "info: ";
      $info .= $_SERVER['HTTP_HOST'].", ";
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      //echo "Ref#: ".$time.", <br><h2>User Login: ".$date."</h2><br><hr>";
      $data = $request->data;
      //echo $data;
      $datad = json_decode($data);
      $email = trim($datad->email);
      //echo $email;
      $temp4 = $this->hashData($datad->password, $email);
      //$options = ['cost' => 8,];
      //$passwdy = password_hash($temp4, PASSWORD_BCRYPT, $options);
      $passwdy = $temp4;
      //echo "<br>";
      //echo $passwdy;
      //echo "<br>";
      $ref3 = "Done";
      $ref2 = 0;
      $ref1 = $time.$email;
      try {
        //$login = DB::select('select * from registrations where email = ?', array($email));
        $login = Registration::where('email', $email)->first();
        $emailx = $login->email;
        $passwdx = $login->password;
        //echo $emailx;
        //echo "<br> #1 <br>";
        //echo $passwdy;
        //echo "<br> #2 <br>";
        //echo $passwdx;
        //echo "<br> #done <br>";
        if(password_verify($passwdy, $passwdx)){
          //echo $_SESSION["ref1"];
          //$request->session()->put('ref1', $ref1);
          //$request->session()->put('ref3', $ref3);
          //$_SESSION["ref1"] = $ref1;
          //$_SESSION["ref3"] = $ref3;
          //echo $ref1;
          $this->dosession('ref1', $ref1);
          $this->dosession('ref3', $ref3);
          $sssn = session_id();
          return response()->json(['ref3' => ['ref1'=> $ref1, 'ref2' => $ref2, 'login' => $login, 'info' => $info, 'token' => $sssn, 'res0' => 'res0']],200);
        } else {
          return response()->json(['ref3' => ['ref1'=> 9, 'ref2' => 6, 'login' => array("0*","*","*"), 'info' => "System error...".$time, 'res0' => 'res0']],200);
        }
      } catch (Exception $e) {
        $info .= $e.", ";
        return response()->json(['ref3' => ['ref1'=> 9, 'ref2' => 6, 'login' => array("0*","*","*"), 'info' => "System error...".$time, 'res0' => 'res0']],200);
      }finally{
        $info .= "Finally: ".$date;
        //echo $info;
      }
    }

    public function logout(Request $request)
    {
      echo $request;
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      $ref = 0;
      if(isset($_SESSION["ref1"])){
        $ref = $_SESSION["ref1"];
        //$request->session()->flush();
        session_destroy();
        unset($_SESSION["ref1"]);
      }
      //echo "Ref#: ".$time.", <br><h2>User Logout: ".$date."</h2><br><hr>";
      return response()->json(['message'=>'logged out', 'ref1' => $ref, 'ref2' => '0'],200);
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

    private function account($x){
      $info = "#".$x."#";
      try{
        $y = "A";
        $z = trim($x);
        $account = $y.substr($z,0,2).time();
        return strtolower($account);
      }catch (Exception $e){
        $info .= $e;
        exit();
      }
      echo $info;
    }

    private function dosession($x, $y){
      try{
        //setcookie($x, $y, time()+3600, "/", "localhost", 0 );
        $_SESSION[$x] = $y;
      } catch(Exception $e){
        echo $e;
      }
    }
}
