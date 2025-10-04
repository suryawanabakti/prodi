<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AdminBeritaController extends Controller
{
    public function approve(Request $request)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'ids' => 'required|array|min:1',
                'ids.*' => 'required|integer|exists:berita,id',
                'is_approve' => 'required|boolean'
            ]);

            // Mulai database transaction
            DB::beginTransaction();

            // Update status approval untuk berita yang dipilih
            $updatedCount = Berita::whereIn('id', $validated['ids'])
                ->update([
                    'is_approve' => $validated['is_approve'],
                    'updated_at' => now()
                ]);

            // Commit transaction
            DB::commit();

            // Log aktivitas
            Log::info('Bulk approval berita', [
                'user_id' => auth()->id(),
                'berita_ids' => $validated['ids'],
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
            Log::error('Error bulk approval berita', [
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

    public function destroy(Berita $berita)
    {
        $berita->delete();
        return back();
    }
    public function index()
    {
        $berita = Berita::all();
        return Inertia::render('Admin/Berita/Index', ["berita" => $berita]);
    }

    public function create()
    {
        $prodi = Prodi::all();
        $isEditing = false;

        return Inertia::render('Admin/Berita/Form', ["prodi" => $prodi, "isEditing" => $isEditing]);
    }

    public function edit(Berita $berita)
    {
        $prodi = Prodi::all();
        $isEditing = true;
        return Inertia::render('Admin/Berita/Form', ["prodi" => $prodi, "isEditing" => $isEditing, "berita" => $berita]);
    }

    public function update(Request $request, Berita $berita)
    {
        $berita->update($request->all());
        return redirect('admin/berita');
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $data['gambar'] = $request->file('gambar')->store('gambar');
        Berita::create($data);
        return redirect('admin/berita');
    }
}
