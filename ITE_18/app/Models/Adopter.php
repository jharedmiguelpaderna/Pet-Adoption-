<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $adopter_id
 * @property string $first_name
 * @property string $last_name
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $address
 * @property string|null $profile_picture
 */
class Adopter extends Authenticatable
{
    use HasApiTokens;
    
    protected $table = 'adopters';
    protected $primaryKey = 'adopter_id';
    public $timestamps = false;

    protected $fillable = [
        'first_name','last_name','address','phone','email','password','birth_date','occupation',
        'company_name','social_media_profile','status','pronouns','alternate_contact_name',
        'alternate_contact_relationship','alternate_contact_phone','alternate_contact_email',
        'valid_id','home_photos','profile_picture'
    ];

    protected $hidden = [
        'password',
    ];

    public function adoptionRequests()
    {
        return $this->hasMany(AdoptionRequest::class, 'adopter_id', 'adopter_id');
    }
}


