<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdoptionRequest extends Model
{
    protected $table = 'adoption_requests';
    protected $primaryKey = 'request_id';
    public $timestamps = false;

    protected $fillable = [
        'adopter_id','pet_id','application_date','online_interview_date','online_interview_time',
        'meet_greet','reason_for_adoption','adoption_status','notes'
    ];

    public function adopter()
    {
        return $this->belongsTo(Adopter::class, 'adopter_id', 'adopter_id');
    }

    public function pet()
    {
        return $this->belongsTo(Pet::class, 'pet_id', 'pet_id');
    }
}


