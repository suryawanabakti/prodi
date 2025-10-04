<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Prodi;
use App\Models\Tujuan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TujuanController extends Controller
{
    public function index()
    {
        $tujuan = Tujuan::ordered()->paginate(10);

        return Inertia::render('Admin/Tujuan/Index', [
            'tujuan' => $tujuan
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tujuan/Create');
    }

    public function index2()
    {
        // Get program studi data
        $prodi = Prodi::first();

        // Get active tujuan ordered by urutan
        $tujuan = Tujuan::active()->ordered()->get();

        return Inertia::render('Tujuan', [
            'prodi' => [
                'id' => $prodi->id,
                'nama_prodi' => $prodi->nama_prodi
            ],
            'tujuan' => $tujuan
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'deskripsi' => 'required|string',
            'urutan' => 'required|integer|min:1',
            'is_active' => 'boolean'
        ]);

        Tujuan::create($request->all());

        return redirect()->route('admin.tujuan.index')
            ->with('success', 'Tujuan berhasil ditambahkan.');
    }

    public function edit(Tujuan $tujuan)
    {
        return Inertia::render('Admin/Tujuan/Edit', [
            'tujuan' => $tujuan
        ]);
    }

    public function update(Request $request, Tujuan $tujuan)
    {
        $request->validate([
            'deskripsi' => 'required|string',
            'urutan' => 'required|integer|min:1',
            'is_active' => 'boolean'
        ]);

        $tujuan->update($request->all());

        return redirect()->route('admin.tujuan.index')
            ->with('success', 'Tujuan berhasil diperbarui.');
    }

    public function destroy(Tujuan $tujuan)
    {
        $tujuan->delete();

        return redirect()->route('admin.tujuan.index')
            ->with('success', 'Tujuan berhasil dihapus.');
    }
}
