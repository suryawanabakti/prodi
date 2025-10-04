<?php

namespace App\Http\Controllers;

use App\Models\Kurikulum;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class KurikulumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function approve(Request $request)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'ids' => 'required|array|min:1',
                'ids.*' => 'required|integer|exists:kurikulums,id',
                'is_approve' => 'required|boolean'
            ]);

            // Mulai database transaction
            DB::beginTransaction();

            // Update status approval untuk kurikulum yang dipilih
            $updatedCount = Kurikulum::whereIn('id', $validated['ids'])
                ->update([
                    'is_approve' => $validated['is_approve'],
                    'updated_at' => now()
                ]);

            // Commit transaction
            DB::commit();

            // Log aktivitas
            Log::info('Bulk approval kurikulum', [
                'user_id' => auth()->id(),
                'kurikulum_ids' => $validated['ids'],
                'is_approve' => $validated['is_approve'],
                'updated_count' => $updatedCount
            ]);

            // Response sukses
            return back();
        } catch (ValidationException $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Data tidak valid',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();

            // Log error
            Log::error('Error bulk approval kurikulum', [
                'error' => $e->getMessage(),
                'user_id' => auth()->id(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat memproses approval',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
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
