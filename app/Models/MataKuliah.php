<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MataKuliah extends Model
{
    public $table = 'mata_kuliah';
    public function dosen()
    {
        return $this->belongsTo(Dosen::class);
    }

    public function kurikulum()
    {
        return $this->belongsTo(Kurikulum::class);
    }
    protected $guarded = ['id'];
}
