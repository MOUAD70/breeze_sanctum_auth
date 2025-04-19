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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('users');
            $table->foreignId('shift_id')->constrained('employee_team_assignments');
            $table->date('date');
            $table->enum('status', ['Present', 'Absent', 'Vacation', 'Sick Leave']);
            $table->unique(['employee_id', 'shift_id', 'date']);
            $table->timestamps();
            $table->softDeletes();
            $table->index(['employee_id', 'shift_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
