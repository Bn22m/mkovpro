<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AccountController extends Controller
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
      echo "Ref#: ".$time.", <br><h2>Account Index: ".$date."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'accounts' => Account::all(),
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
      echo "Ref#: ".$time.", <br><h2>Account Store: ".$date."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'accounts' => Account::all(),
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
      echo "Ref#: ".$time.", <br><h2>Account Show: ".$id."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'accounts' => Account::all(),
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
      echo "Ref#: ".$time.", <br><h2>Account Update: ".$id."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'accounts' => Account::all(),
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
      echo "Ref#: ".$time.", <br><h2>Account Destroy: ".$id."</h2><br><hr>";
      exit();
      return response()->json([
        'error' => false,
        'accounts' => Account::all(),
      ], 200);
    }
}
