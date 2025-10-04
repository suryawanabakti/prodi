<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Kurikulum;
use App\Models\MataKuliah;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AdminMataKuliahController extends Controller
{
    public function approve(Request $request)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'ids' => 'required|array|min:1',
                'ids.*' => 'required|integer|exists:mata_kuliah,id',
                'is_approve' => 'required|boolean'
            ]);

            // Mulai database transaction
            DB::beginTransaction();

            // Update status approval untuk mata kuliah yang dipilih
            $updatedCount = MataKuliah::whereIn('id', $validated['ids'])
                ->update([
                    'is_approve' => $validated['is_approve'],
                    'updated_at' => now()
                ]);

            // Commit transaction
            DB::commit();

            // Log aktivitas
            Log::info('Bulk approval mata kuliah', [
                'user_id' => auth()->id(),
                'mata_kuliah_ids' => $validated['ids'],
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
            Log::error('Error bulk approval mata kuliah', [
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
