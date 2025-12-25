<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shelter extends Model
{
    protected $table = 'shelters';
    protected $primaryKey = 'shelter_id';
    public $timestamps = false;

    protected $fillable = [
        'admin_id',
        'shelter_name',
        'staff_name',
        'staff_email',
        'staff_phone',
        'location',
        'contact_info',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id', 'admin_id');
    }

    public function pets()
    {
        return $this->hasMany(Pet::class, 'shelter_id', 'shelter_id');
    }
}


