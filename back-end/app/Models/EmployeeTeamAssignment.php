<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmployeeTeamAssignment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_id',
        'team_id',
        'shift_start',
        'shift_end',
    ];

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
