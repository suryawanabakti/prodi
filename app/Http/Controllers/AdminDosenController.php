<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDosenController extends Controller
{
    public function destroy(Dosen $dosen)
    {
        $dosen->delete();
        return back();
    }
    public function index()
    {
        $dosen = Dosen::all();
        return Inertia::render("Admin/Dosen/Index", ["dosen" => $dosen]);
    }

    public function create()
    {
        $prodi = Prodi::all();
        $isEditing = false;

        return Inertia::render('Admin/Dosen/Form', ["prodi" => $prodi, "isEditing" => $isEditing]);
    }

    public function edit(Dosen $dosen)
    {
        $prodi = Prodi::all();
        $isEditing = true;
        return Inertia::render('Admin/Dosen/Form', ["prodi" => $prodi, "isEditing" => $isEditing, "dosen" => $dosen]);
    }

    public function update(Request $request, Dosen $dosen)
    {
        $data = $request->all();
        if ($request->foto) {
            $data['foto'] = $request->file('foto')->store('foto_dosen');
        }
        $dosen->update($data);
        return redirect('admin/dosen');
    }

    public function store(Request $request)
    {
        $data = $request->all();
        if ($request->foto) {
            $data['foto'] = $request->file('foto')->store('foto_dosen');
        }
        Dosen::create($data);
        return redirect('admin/dosen');
    }
}
