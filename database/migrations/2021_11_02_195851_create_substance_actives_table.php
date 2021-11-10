<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubstanceActivesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('substance_actives', function (Blueprint $table) {
            $table->id();
            $table->string('id_ingredient');
            $table->string('ingredient_name');
            $table->string('status');
            $table->text('remarks');
            $table->string('decode_substancetype_ingredient');
            $table->string('decode_substanceNametype_ingredient');
            $table->string('decode_language_ingredient');
            $table->string('decode_role_ingredientlist_ingredient');
            $table->string('decode_substancestatus_ingredient');
            $table->integer('ingredient');
            $table->integer('material');
            $table->integer('alternate_material');
            $table->string('synthesis_component');
            $table->string('decode_substancenumbertype_substancenumbertypelist_ingredient');
            $table->string('substancenumber_substancenumbertypelist_ingredient');
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
        Schema::dropIfExists('substance_actives');
    }
}
