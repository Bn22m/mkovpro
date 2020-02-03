<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
  protected $fillable = [
    'ordern', 'code', 'order', 'price',
    'account', 'name', 'email', 'address',
    'orderdate', 'comments', 'done', 'doneby',
    'donedate', 'reference'
  ];

  const ORDERS_ORDERN_UNIQUE = "ordern";
  public $timestamps = false;
}
 
