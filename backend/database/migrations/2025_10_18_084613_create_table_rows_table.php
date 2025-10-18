<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('table_rows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('table_id')->references('id')->on('tables');
            $table->json('data');
            $table->foreignId('created_by')->references('id')->on('users');
            $table->timestamp('created_at');
            $table->foreignId('deleted_by')->nullable()->references('id')->on('users');
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('table_rows');
    }
};
