<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pharmacy;
use App\Models\Drug;
class PharmacyDrugs extends Model
{
    use HasFactory;
    protected $table='pharmacy_drugs';
    public $timestamps = false;
}
