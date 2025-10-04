<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Prodi;
use App\Models\ProfilLulusan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfilLulusanController extends Controller
{
    public function index2()
    {
        // Get program studi data
        $prodi = Prodi::first();

        // Get active profil lulusan ordered by urutan
        $profilLulusan = ProfilLulusan::active()->ordered()->get();

        return Inertia::render('ProfilLulusan', [
            'prodi' => [
                'id' => $prodi->id,
                'nama_prodi' => $prodi->nama_prodi
            ],
            'profilLulusan' => $profilLulusan
        ]);
    }

    public function index()
    {
        $profilLulusan = ProfilLulusan::ordered()->paginate(10);

        return Inertia::render('Admin/ProfilLulusan/Index', [
            'profilLulusan' => $profilLulusan
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ProfilLulusan/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'urutan' => 'required|integer|min:1',
            'is_active' => 'boolean'
        ]);

        $data = $request->all();

        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('profil-lulusan', 'public');
        }

        ProfilLulusan::create($data);

        return redirect()->route('admin.profil-lulusan.index')
            ->with('success', 'Profil lulusan berhasil ditambahkan.');
    }

    public function edit(ProfilLulusan $profilLulusan)
    {
        return Inertia::render('Admin/ProfilLulusan/Edit', [
            'profilLulusan' => $profilLulusan
        ]);
    }

    public function update(Request $request, ProfilLulusan $profilLulusan)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'urutan' => 'required|integer|min:1',
            'is_active' => 'boolean'
        ]);

        $data = $request->all();

        if ($request->hasFile('gambar')) {
            // Delete old image
            if ($profilLulusan->gambar) {
                Storage::disk('public')->delete($profilLulusan->gambar);
            }
            $data['gambar'] = $request->file('gambar')->store('profil-lulusan', 'public');
        }

        $profilLulusan->update($data);

        return redirect()->route('admin.profil-lulusan.index')
            ->with('success', 'Profil lulusan berhasil diperbarui.');
    }

    public function destroy(ProfilLulusan $profilLulusan)
    {
        // Delete image file
        if ($profilLulusan->gambar) {
            Storage::disk('public')->delete($profilLulusan->gambar);
        }

        $profilLulusan->delete();

        return redirect()->route('admin.profil-lulusan.index')
            ->with('success', 'Profil lulusan berhasil dihapus.');
    }
}
