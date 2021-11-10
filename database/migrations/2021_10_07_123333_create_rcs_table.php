<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRcsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rcs', function (Blueprint $table) {
            $table->id();
            $table->string('procedure_type');
            $table->string('country_global')->nullable();
            $table->string('eu_member_state')->nullable();
            $table->string('concerned_member_state')->nullable();
            $table->string('product_type');
            $table->string('product_name');
            $table->string('application_stage');
            $table->string('local_tradename');
            $table->string('registration_holder');
            $table->string('application_number')->nullable();
            $table->string('dossier_reference_number')->nullable();
            $table->text('remarks')->nullable();
            $table->string('orphan_designation_status')->nullable();
            $table->string('orphan_indication_type')->nullable();
            $table->string('under_intensive_monitoring')->nullable();
            $table->string('authorized_pharmaceutical_form');
            $table->string('route_of_admin');
            $table->string('atc');
            $table->string('date_type')->nullable();
            $table->string('date')->nullable();
            $table->string('alternate_number_type')->nullable();
            $table->string('alternate_number')->nullable();
            $table->text('bi_remarks')->nullable();
            $table->string('local_agent_company')->nullable();
            $table->string('ingredient')->nullable();
            $table->string('strength_type')->nullable();
            $table->string('numerator_lower_val')->nullable();
            $table->string('numerator_upper_val')->nullable();
            $table->string('numerator_unit')->nullable();
            $table->string('function')->nullable();
            $table->string('packaging_type')->nullable();
            $table->string('packaging_name');
            $table->string('description');
            $table->string('package_registrationr_number');
            $table->string('lunched')->nullable();
            $table->string('first_lunch_date')->nullable();
            $table->string('packaging_discontinued')->nullable();
            $table->string('discontinuation_date')->nullable();
            $table->string('package_shelf_life_type')->nullable();
            $table->string('shelf_life')->nullable();
            $table->string('shelf_life_unit')->nullable();
            $table->string('package_storage_condition')->nullable();
            $table->string('indication');
            $table->string('paediatric_use')->nullable();
            $table->string('control_site');
            $table->string('distributor');
            $table->string('exploitant');
            $table->string('manufacturer_of_the_active_substance');
            $table->string('manufacturer_of_the_finished_product');
            $table->string('inner_packaging_site');
            $table->string('outer_packaging_site');
            $table->string('release_site');
            $table->string('supplier_of_active_ingredient');
            $table->string('bulk_manufacturing_site');
            $table->string('status');
            $table->string('status_date');
            $table->string('ectd_sequence')->nullable();
            $table->string('change_control_ref')->nullable();
            $table->string('internal_submission_reference')->nullable();
            $table->string('sremarks')->nullable();
            $table->json('doc')->nullable();
            // $table->string('document_type');
            // $table->string('document_title');
            // $table->string('language');
            // $table->string('version_date');
            // $table->string('dremarks');
            // $table->string('document');
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
        Schema::dropIfExists('rcs');
    }
}
