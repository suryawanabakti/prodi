<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAlumniController extends Controller
{
    public function destroy(Alumni $alumni)
    {
        $alumni->delete();
        return back();
    }

    public function index()
    {
        $alumni = Alumni::all();
        return Inertia::render("Admin/Alumni/Index", ["alumni" => $alumni]);
    }

    public function create()
    {
        $prodi = Prodi::all();
        $isEditing = false;
        $alumni = Alumni::first();

        return Inertia::render('Admin/Alumni/Form', ["prodi" => $prodi, "isEditing" => $isEditing, "dosen" => $alumni]);
    }

    public function edit(Alumni $alumni)
    {
        $prodi = Prodi::all();
        $isEditing = true;
        return Inertia::render('Admin/Alumni/Form', ["prodi" => $prodi, "isEditing" => $isEditing, "alumni" => $alumni]);
    }

    public function update(Request $request, Alumni $alumni)
    {
        $alumni->update($request->all());
        return redirect('admin/alumni');
    }

    public function store(Request $request)
    {
        Alumni::create($request->all());
        return redirect('admin/alumni');
    }
}
