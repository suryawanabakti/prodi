<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProdiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "nama_prodi" => $this->nama_prodi,
            "nama_ketua" => $this->nama_ketua,
            "foto_ketua" => $this->foto_ketua ? url('storage/' . $this->foto_ketua) : null,
            "foto_prodi" => $this->foto_prodi ? url('storage/' . $this->foto_prodi) : null,
            "visi" => $this->visi,
            "misi" => $this->misi,
        ];
    }
}
