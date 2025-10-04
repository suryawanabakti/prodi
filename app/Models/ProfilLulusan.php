<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProfilLulusan extends Model
{
    use HasFactory;

    protected $table = 'profil_lulusan';

    protected $fillable = [
        'judul',
        'deskripsi',
        'gambar',
        'urutan',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    protected $appends = ['gambar_url'];

    public function getGambarUrlAttribute()
    {
        if ($this->gambar) {
            return Storage::url($this->gambar);
        }
        return null;
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('urutan', 'asc');
    }
}
