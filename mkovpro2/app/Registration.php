<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
  protected $fillable = [
    'account', 'name', 'surname', 'utype', 'email', 'verified', 'address', 'password',
    'created', 'modified', 'comments', 'reference',
  ];

  protected $attributse = [
    'modified' => NULL,
  ];

  public $timestamps = false;
}
