<?php

namespace App\Http\Controllers;

use App\Models\Kurikulum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KurikulumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kurikulums = Kurikulum::all();

        return Inertia::render('Admin/Kurikulum/Index', [
            'kurikulums' => $kurikulums
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Kurikulum/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        Kurikulum::create($validated);

        return redirect()->route('kurikulums.index')
            ->with('message', 'Kurikulum created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kurikulum $kurikulum)
    {
        return Inertia::render('Admin/Kurikulum/Edit', [
            'kurikulum' => $kurikulum
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kurikulum $kurikulum)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $kurikulum->update($validated);

        return redirect()->route('kurikulums.index')
            ->with('message', 'Kurikulum updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kurikulum $kurikulum)
    {
        $kurikulum->delete();

        return redirect()->route('kurikulums.index')
            ->with('message', 'Kurikulum deleted successfully.');
    }
}
