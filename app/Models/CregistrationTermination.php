<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;

class CregistrationTermination extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'clinical_registration_termination';
    use HasFactory;
    
}
