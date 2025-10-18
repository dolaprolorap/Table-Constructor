<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('logger_table_rows', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('table_id');
            $table->json('logged_data');
            $table->unsignedBigInteger('logged_by');
            $table->timestamp('logged_at');
            $table->timestamps();

            $table->foreign('table_id')->references('id')->on('tables');
            $table->foreign('logged_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logger_table_rows');
    }
};
