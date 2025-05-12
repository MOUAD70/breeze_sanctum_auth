<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Site extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'site_name',
        'site_type',
        'address'
    ];

    /**
     * Get the users for the site.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
