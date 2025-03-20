<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminBeritaController extends Controller
{
    public function destroy(Berita $berita)
    {
        $berita->delete();
        return back();
    }
    public function index()
    {
        $berita = Berita::all();
        return Inertia::render('Admin/Berita/Index', ["berita" => $berita]);
    }

    public function create()
    {
        $prodi = Prodi::all();
        $isEditing = false;

        return Inertia::render('Admin/Berita/Form', ["prodi" => $prodi, "isEditing" => $isEditing]);
    }

    public function edit(Berita $berita)
    {
        $prodi = Prodi::all();
        $isEditing = true;
        return Inertia::render('Admin/Berita/Form', ["prodi" => $prodi, "isEditing" => $isEditing, "berita" => $berita]);
    }

    public function update(Request $request, Berita $berita)
    {
        $berita->update($request->all());
        return redirect('admin/berita');
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $data['gambar'] = $request->file('gambar')->store('gambar');
        Berita::create($data);
        return redirect('admin/berita');
    }
}
