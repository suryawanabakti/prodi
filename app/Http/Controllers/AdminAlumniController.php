<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use App\Models\Prodi;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AdminAlumniController extends Controller
{
    public function approve(Request $request)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'ids' => 'required|array|min:1',
                'ids.*' => 'required|integer|exists:alumni,id',
                'is_approve' => 'required|boolean'
            ]);

            // Mulai database transaction
            DB::beginTransaction();

            // Update status approval untuk alumni yang dipilih
            $updatedCount = Alumni::whereIn('id', $validated['ids'])
                ->update([
                    'is_approve' => $validated['is_approve'],
                    'updated_at' => now()
                ]);

            // Commit transaction
            DB::commit();

            // Log aktivitas
            Log::info('Bulk approval alumni', [
                'user_id' => auth()->id(),
                'alumni_ids' => $validated['ids'],
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
            Log::error('Error bulk approval alumni', [
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

    public function export()
    {
        $alumni  = Alumni::all();
        $pdf = Pdf::loadView("export.alumni", compact('alumni'));
        return $pdf->stream();
    }
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
