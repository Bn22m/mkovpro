<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('ordern', 99);
            $table->string('code', 30);
            $table->string('order', 30);
            $table->float('price');
            $table->string('account', 30);
            $table->string('name');
            $table->string('email', 30);
            $table->string('address');
            $table->timestamp('orderdate')->useCurrent();
            $table->text('comments');
            $table->boolean('done');
            $table->string('doneby');
            $table->timestamp('donedate')->nullable();
            $table->string('reference');

            $table->unique('ordern', 'ordern');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
