<?php

use Illuminate\Database\Seeder;
use App\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      Product::create([
        'code' => 'sup20190801001', 'name' => 'SuperSun',
        'description' => 'Awesome SuperSun.', 'price' => 1540.90,
        'quantity' => 500, 'created' => '2019-08-01 00:00:00',
        'updated' => '2019-12-01 00:00:00', 'comments' => 'Limited Stock.'
      ]);

      Product::create([
        'code' => 'coo20190801002', 'name' => 'CoolSun',
        'description' => 'Awesome CoolSun.', 'price' => 540.90,
        'quantity' => 5000, 'created' => '2019-08-01 00:00:00',
        'updated' => '2019-11-01 00:00:00', 'comments' => 'Amazing.'
      ]);

      Product::create([
        'code' => 'spa20190801003', 'name' => 'SpaceSun',
        'description' => 'Awesome SpaceSun.', 'price' => 6540.90,
        'quantity' => 100, 'created' => '2019-08-01 00:00:00',
        'updated' => '2019-10-01 00:00:00', 'comments' => 'Virtual Reality is Awesome.'
      ]);

      Product::create([
        'code' => 'moo20191201001', 'name' => 'MoonSun',
        'description' => 'Awesome MoonSun.', 'price' => 25.90,
        'quantity' => 1500, 'created' => '2019-08-01 00:00:00',
        'updated' => '2019-12-21 00:00:00', 'comments' => 'Virtual space Special'
      ]);
    }
}
