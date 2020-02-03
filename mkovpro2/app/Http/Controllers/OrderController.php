<?php

namespace App\Http\Controllers;
//session_start();

use App\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
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
      echo "Ref#: ".$time.", <br><h2>Order Index: ".$date."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'orders' => Order::all(),
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
      echo "Ref#: ".$time.", <br><h2>Order Strore: ".$date."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'orders' => Order::all(),
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
      echo "Ref#: ".$time.", <br><h2>Order Show: ".$id."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'orders' => Order::all(),
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
      echo "Ref#: ".$time.", <br><h2>Order Update: ".$id."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'orders' => Order::all(),
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
      echo "Ref#: ".$time.", <br><h2>Order Destroy: ".$id."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'orders' => Order::all(),
      ], 200);
    }

    /*
    *
    * http://127.0.0.1:8000/api/order?data={"account": "a.... " ,"name": "Awesome", "email": "awesome@awe.co", "address": "24 Cool Str,..", "order": "productn", "price":"34.98","orderRef":"20378..", "0": "0"}
    */
    public function order(Request $request)
    {
      $data = $request->data;
      $datad = json_decode($data);
      $token1 = $datad->token;
      $sssn = session_id($token1);
      session_start();
      $info = "New Order: ";
      $info2 ="No info: ";
      if(isset($_SESSION["ref1"])){
        $info .= $_SESSION["ref1"];
        //echo $info;
        //echo " <br> # ";
        //echo $sssn;
        //echo " # <br> ";
      }else {
        //echo $info2;
        //echo $request;
        //echo $sssn;
        //echo "<br>";
        exit();
      }
      $info .= $_SERVER['HTTP_HOST'].", ";
      //$data = $request->data;
      //$datad = json_decode($data);
      //echo "<br>";
      //echo "<h2>".$datad->name."</h2>";
      //echo "<br>";
      //echo "Register:";
      //$time = time();
      //$date = date("Y-m-d H:i:s", $time);
      //echo "Ref#: ".$time.", <br><h2>User: ".$request.", Registerd: ".$date."</h2><br><hr>";
      //$temp4 = $this->hashData($datad->password, trim($datad->email));
      //$email = trim($datad->email);
      //echo $email;
      //$temp4 = $this->hashData($datad->password, $email);
      //$options = ['cost' => 8,];
      //$passwd = password_hash($temp4, PASSWORD_BCRYPT, $options);
      try {
        $time = time();
        $date = date("Y-m-d H:i:s", $time);
        $email = trim($datad->email);
        $order = Order::create([
          'ordern' => $this->ordern($datad->name, $datad->buy),
          'account' => trim($datad->account),
          'name' => trim($datad->name),
          'email' => trim($datad->email),
          'address' => trim($datad->address),
          'orderdate' => $date,
          'order' => trim($datad->buy),
          'code' => trim($datad->code),
          'price' => trim($datad->pay),
          'comments' => "New order" ,
          'done' => FALSE,
          'doneby' => "New order",
          'donedate' => NULL,
          'reference' => trim($datad->orderRef).$time
        ]);
        $ref3 = "Done";
        $ref2 = 0;
        $ref1 = $time.$email;
        $this->dosession('ref1', $ref1);
        $this->dosession('ref3', $ref3);
        $sssn = session_id();
        //echo $sssn;
        //echo "<br>";
        return response()->json(['ref3' => ['ref1'=> $ref1, 'ref2' => $ref2, 'info' => $info, 'token' => $sssn, 'res0' => 'res0']],200);
      } catch (Exception $e) {
        //echo $e;
        return response()->json(['ref3' => ['ref1'=> 9, 'ref2' => 6, 'login' => array("0*","*","*"), 'info' => "System error...".$time, 'res0' => 'res0']],200);
      }
      return response()->json(['ref3' => ['ref1'=> 9, 'ref2' => 6, 'login' => array("0*","*","*"), 'info' => "System error...".$time, 'res0' => 'res0']],200);
    }

    private function ordern($x, $j){
      $info = time();
      try{
        $y = time();
        $z = trim($x);
        $i = trim($j);
        $code = $y.substr($z,0,3).substr($i,0,3);
        return strtolower($code);
      }catch (Exception $e){
        $info .= $e;
        exit();
      }
      //echo $info;
    }

    private function dosession($x, $y){
      try{
        //setcookie($x, $y, time()+3600, "/", "localhost", 0 );
        $_SESSION[$x] = $y;
        //echo $_SESSION[$x];
      } catch(Exception $e){
        //echo $e;
      }
    }
}
