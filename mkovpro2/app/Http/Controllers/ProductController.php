<?php

namespace App\Http\Controllers;
session_start();

use App\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
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
      return response()->json([
      'ref#'=> $time, 'date' => $date,
      'specials' => [
        ['code' => '0001', 'name' => 'awesome', 'description' => 'awesome', 'price' => '24.99'],
        ['code' => '0002', 'name' => 'cool', 'description' => 'cool', 'price' => '59.99'],
        ['code' => '0003', 'name' => 'supercool', 'description' => 'supercool', 'price' => '99.99'],
      ],
      'products' => Product::all(),
      ],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       echo $request;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function get(Request $request){
      //
    }

    /*
    *
    * http://127.0.0.1:8000/api/newproduct?data={"name": "Awesome", "description": "....", "price": "100.00", "quantity": "300", "email": "awesome@awe.co", "password": "****", "0": "0"}
    */
    public function newproduct(Request $request){
      $ref = "New Product: ";
      if(isset($_SESSION["ref1"])){
        $ref .= $_SESSION["ref1"];
        //echo $ref;
      }else {
        $ref .= "01";
        //exit();
      }
      //echo $ref;
      $info = "info: ";
      $info .= $_SERVER['HTTP_HOST'].", ";
      $data = $request->data;
      $datad = json_decode($data);
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      $email = $this->email("email@email.em");
      $temp4 = $this->hashData($datad->password, $email);
      $passwdy = $temp4;
      //$passwdx = '$2$8*****v8xyz';
      $passwdx = '$2y$08$12e9ncOvmkBpqwMqvE88eOAQbRMZPCySCWauJQjfeMGpf61aiRspa';
      if(password_verify($passwdy, $passwdx)){
        $name = trim($datad->name);
        $code = $this->code($name);
        $product = Product::create([
        'code' => $code,
        'name' => $name,
        'description' => trim($datad->description),
        'price' => $datad->price,
        'quantity' => $datad->quantity,
        'created' => $date,
        'updated' => $date,
        'comments' => $ref,
        ]);
        $reg = $product["code"];
        $ref2 = 0;
        $ref1 = $time.$reg;
        return response()->json(['ref3' => ['ref1'=> $ref1, 'ref2' => $ref2, 'product' => $product, 'info' => $info, 'res0' => 'res0']],200);
        } else {
        return response()->json(['ref3' => ['ref1'=> 9, 'ref2' => 6, 'login' => array("0*","*","*"), 'info' => "System error...".$time, 'res0' => 'res0']],200);
      }
    }

    public function addproduct(Request $request){
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      echo "Ref#: ".$time.", <br><h2>Product: buy ".$date."</h2><br><hr>";
    }

    public function buyproduct(Request $request){
      $time = time();
      $date = date("Y-m-d H:i:s", $time);
      echo "Ref#: ".$time.", <br><h2>Product: buy ".$date."</h2><br><hr>";
      return 0;
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

    private function code($x){
      $info = "#".$x."#";
      try{
        $y = "";
        $z = trim($x);
        $code = $y.substr($z,0,3).time();
        return strtolower($code);
      }catch (Exception $e){
        $info .= $e;
        exit();
      }
      echo $info;
    }

    private function email($x){
      //echo $x;
      $y = 'admin@admin.co';
      return $y;
    }
}
