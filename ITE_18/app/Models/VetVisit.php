<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VetVisit extends Model
{
    protected $table = 'vet_visits';
    protected $primaryKey = 'vet_id';
    public $timestamps = false;

    protected $fillable = [
        'pet_id','vet_name','visit_date','purpose','diagnosis','treatment','remarks','next_visit_due'
    ];

    public function pet()
    {
        return $this->belongsTo(Pet::class, 'pet_id', 'pet_id');
    }
}


