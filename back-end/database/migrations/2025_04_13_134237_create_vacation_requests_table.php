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
        Schema::create('vacation_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('users');
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', ['Pending', 'Approved', 'Denied']);
            $table->foreignId('assigned_to')->nullable()->constrained('users');
            $table->unique(['employee_id', 'start_date', 'end_date']);
            $table->timestamps();
            $table->softDeletes();
            $table->index(['employee_id', 'assigned_to']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacation_requests');
    }
};
