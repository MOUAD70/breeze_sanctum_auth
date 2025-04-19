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
        Schema::create('checkins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('users');
            $table->foreignId('site_id')->constrained('sites');
            $table->timestamp('checkin_time');
            $table->timestamp('checkout_time')->nullable();
            $table->enum('status', ['Present', 'Absent']);
            $table->timestamps();
            $table->softDeletes();
            $table->index(['employee_id', 'site_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checkins');
    }
};
