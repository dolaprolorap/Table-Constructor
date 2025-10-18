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
        Schema::create('table_rows', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('table_id');
            $table->json('data');
            $table->unsignedBigInteger('created_by');
            $table->timestamp('created_at');
            $table->unsignedBigInteger('deleted_by')->nullable();
            $table->timestamp('deleted_at')->nullable();

            $table->foreign('table_id')->references('id')->on('tables');
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('deleted_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_rows');
    }
};
