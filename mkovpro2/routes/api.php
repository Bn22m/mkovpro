<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Request-With, Content-Type, Accept");

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('products', function(){
  $time = time();
  $date = date("Y-m-d H:i:s", $time);
  return response()->json([
    'date' => $date, 'time' => $time,
    'specials' => [
    ['id' => '00001', 'name' => 'awesome', 'description' => 'awesome', 'price' => '24.99'],
    ['id' => '00002', 'name' => 'cool', 'description' => 'cool', 'price' => '59.99'],
    ['id' => '00003', 'name' => 'supercool', 'description' => 'supercool', 'price' => '99.99'],
    ],
    'products' => [
    ['code' => 'awe201801120001', 'description' => 'awesome4', 'price' => '56.45'],
    ['code' => 'coo201901120002', 'description' => 'cool4', 'price' => '50.99'],
    ['code' => 'swe201903120005', 'description' => 'sweat4', 'price' => '60.99'],
    ]
  ],200);
});

Route::get('/register', 'RegistrationController@register');
Route::post('/register','RegistrationController@register');
Route::get('/register/login','RegistrationController@login');
Route::post('/register/login','RegistrationController@login');
Route::get('/register/logout','RegistrationController@logout');

Route::post('/newproduct','ProductController@newproduct');
Route::post('/addproduct','ProductController@addproduct');
Route::get('/order','OrderController@order');
Route::post('/order','OrderController@order');

Route::group(['prefix' => 'v1'], function(){
  Route::apiResource('products','ProductController');
  Route::apiResource('register','RegistrationController');
  Route::apiResource('order','OrderController');
  Route::apiResource('account','AccountController');
});
