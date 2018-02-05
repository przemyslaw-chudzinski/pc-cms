<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('display_name')->nullalbe()->default(null);
            $table->text('description')->nullable()->default(null);
            $table->longText('permissions')->nullable()->default(null);
            $table->boolean('allow_remove')->default(true);
            $table->timestamps();
        });


        Schema::table('users', function (Blueprint $table) {
            $table->integer('role_id')->unsigned()->nullable()->default(null);
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('set null');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('roles');
    }
}
