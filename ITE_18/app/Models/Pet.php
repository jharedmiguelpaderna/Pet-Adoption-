<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     * Using default 'pets'.
     */
    protected $table = 'pets';

    /**
     * The primary key for the model.
     */
    protected $primaryKey = 'pet_id';

    /**
     * Indicates if the model should be timestamped.
     * Migration does not include created_at/updated_at.
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'shelter_id',
        'name',
        'species',
        'breed',
        'age',
        'gender',
        'weight',
        'health_status',
        'food_preferences',
        'last_vet_visit',
        'next_vet_visit_due',
        'adoption_status',
        'date_admitted',
        'description',
        'photo_url',
    ];

    /**
     * Get the shelter that owns the pet.
     */
    public function shelter()
    {
        return $this->belongsTo(Shelter::class, 'shelter_id', 'shelter_id');
    }

    /**
     * Get the adoption requests for the pet.
     */
    public function adoptionRequests()
    {
        return $this->hasMany(AdoptionRequest::class, 'pet_id', 'pet_id');
    }

    /**
     * Get the vet visits for the pet.
     */
    public function vetVisits()
    {
        return $this->hasMany(VetVisit::class, 'pet_id', 'pet_id');
    }
}


