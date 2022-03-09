<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;

class RegistrationTermination extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'registration_termination';
    use HasFactory;
}
