<?php

namespace App\Http\Controllers;

use App\Models\Unduhan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminUnduhanController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Unduhan/Index', [
            'unduhan' => Unduhan::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Unduhan/Create');
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'file' => 'required|file|max:10240',
        ]);

        $path = $request->file('file')->store('unduhan', 'public');

        Unduhan::create([
            'nama' => $validated['nama'],
            'file' => $path,
        ]);

        return redirect()->route('admin.unduhan.index')
            ->with('message', 'Unduhan created successfully.');
    }

    public function edit(Unduhan $unduhan)
    {
        return Inertia::render('Admin/Unduhan/Edit', [
            'unduhan' => $unduhan
        ]);
    }

    public function update(Request $request, Unduhan $unduhan)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,zip,rar|max:10240',
        ]);

        if ($request->hasFile('file')) {
            // Delete old file
            if ($unduhan->file) {
                Storage::disk('public')->delete($unduhan->file);
            }

            $path = $request->file('file')->store('unduhan', 'public');
            $unduhan->file = $path;
        }

        $unduhan->nama = $validated['nama'];
        $unduhan->save();

        return redirect()->route('unduhan.index')
            ->with('message', 'Unduhan updated successfully.');
    }

    public function destroy(Unduhan $unduhan)
    {
        // Delete file from storage
        if ($unduhan->file) {
            Storage::disk('public')->delete($unduhan->file);
        }

        $unduhan->delete();

        return redirect()->route('admin.unduhan.index')
            ->with('message', 'Unduhan deleted successfully.');
    }

    public function download(Unduhan $unduhan)
    {
        return Storage::disk('public')->download($unduhan->file);
    }
}
