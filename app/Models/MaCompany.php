<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;

class MaCompany extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'macompany';
    use HasFactory;
}
