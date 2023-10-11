<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('adresse')->nullable();
            $table->text('description')->nullable();
            $table->string('owner')->nullable();
            $table->string('architect')->nullable();
            $table->string('execution_mission')->nullable();
            $table->integer('surface')->nullable();
            $table->integer('amount')->nullable();
            $table->string('video')->nullable();
            $table->date('date');
            $table->unsignedInteger('category_id');
            //relation
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
