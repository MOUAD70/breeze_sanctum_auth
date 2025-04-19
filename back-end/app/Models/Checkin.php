<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use function PHPSTORM_META\map;

class Checkin extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_id',
        'site_id',
        'checkin_time',
        'checkout_time',
        'status'
    ];
}
