<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProdiResource;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProdiController extends Controller
{
    public function edit()
    {

        $prodi = ProdiResource::make(Prodi::first());

        return Inertia::render("Admin/Prodi/Form", ["prodi" => $prodi]);
    }

    public function update(Request $request)
    {
        $prodi = Prodi::first();
        $valData = $request->validate([
            'nama_prodi' => ['required'],
            'quoute' => ['required'],
            'nama_ketua' => ['required'],
            'visi' => ['required'],
            'misi' => ['required'],
        ]);
        if ($request->foto_prodi) {
            $valData['foto_prodi'] = $request->file('foto_prodi')->store('foto_prodi');
        }

        if ($request->foto_ketua) {
            $valData['foto_ketua'] = $request->file('foto_ketua')->store('foto_ketua');
        }
        $prodi->update($valData);
        return back();
    }
}
