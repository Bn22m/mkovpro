<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('account', 30);
            $table->string('name');
            $table->string('surname');
            $table->string('utype');
            $table->string('email', 30);
            $table->timestamp('verified')->nullable();
            $table->string('address');
            $table->string('password');
            $table->timestamp('created')->useCurrent();
            $table->timestamp('modified')->nullable();
            $table->text('comments');
            $table->string('reference');

            $table->unique('account', 'account');
            $table->unique('email', 'email');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('registrations');
    }
}
