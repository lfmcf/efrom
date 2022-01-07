<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;

class Transfer extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'transfer';
    use HasFactory;
}
