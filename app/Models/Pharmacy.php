<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Drug;
use App\Models\PharmacyDrugs;
class Pharmacy extends Model
{
    use HasFactory;
    protected $table='pharmacy';
    public function drug(){
        return $this->belongsToMany(Drug::class,'pharmacy_drugs');
    }
}
