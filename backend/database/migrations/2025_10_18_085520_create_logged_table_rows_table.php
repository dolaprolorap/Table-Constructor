<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('logged_table_rows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('table_row_id')->references('id')->on('table_rows');
            $table->json('logged_data');
            $table->foreignId('logged_by')->references('id')->on('users');
            $table->timestamp('logged_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('logged_table_rows');
    }
};
