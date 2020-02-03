<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
      'code', 'name', 'description', 'price',
      'quantity', 'created', 'updated','comments',
    ];

    //protected $guarded = [
    //  'updated'
    //];
    const PRODUCTS_CODE_UNIQUE = "code";
    public $timestamps = false;
}
