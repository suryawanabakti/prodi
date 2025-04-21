<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Kurikulum;
use App\Models\MataKuliah;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminMataKuliahController extends Controller
{

    public function destroy(MataKuliah $matakuliah)
    {
        $matakuliah->delete();
        return back();
    }

    public function index()
    {
        $matakuliah = MataKuliah::with('kurikulum', 'dosen')->get();
        return Inertia::render('Admin/MataKuliah/Index', ["mataKuliah" => $matakuliah]);
    }

    public function create()
    {
        $prodi = Prodi::all();
        $isEditing = false;
        $kurikulums = Kurikulum::all();
        $dosens = Dosen::all();

        return Inertia::render('Admin/MataKuliah/Form', ["prodi" => $prodi, "isEditing" => $isEditing, "kurikulums" => $kurikulums, "dosens" => $dosens]);
    }

    public function edit(MataKuliah $matakuliah)
    {

        $prodi = Prodi::all();
        $isEditing = true;
        $kurikulums = Kurikulum::all();
        $dosens = Dosen::all();
        return Inertia::render('Admin/MataKuliah/Form', ["prodi" => $prodi, "isEditing" => $isEditing, "mataKuliah" => $matakuliah, "kurikulums" => $kurikulums, "dosens" => $dosens]);
    }

    public function update(Request $request, MataKuliah $matakuliah)
    {
        $matakuliah->update($request->all());
        return redirect('admin/mata-kuliah');
    }

    public function store(Request $request)
    {

        MataKuliah::create($request->all());
        return redirect('admin/mata-kuliah');
    }
}
