<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $admin_id
 * @property string $name
 * @property string $email
 * @property string|null $phone
 * @property string|null $profile_picture
 */
class Admin extends Authenticatable
{
    use HasApiTokens;
    
    protected $table = 'admin';
    protected $primaryKey = 'admin_id';
    public $timestamps = true;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'profile_picture',
    ];

    protected $hidden = [
        'password',
    ];

    public function shelters()
    {
        return $this->hasMany(Shelter::class, 'admin_id', 'admin_id');
    }
}


