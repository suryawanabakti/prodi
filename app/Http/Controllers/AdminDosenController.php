<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AdminDosenController extends Controller
{
    public function approve(Request $request)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'ids' => 'required|array|min:1',
                'ids.*' => 'required|integer|exists:dosen,id',
                'is_approve' => 'required|boolean'
            ]);

            // Mulai database transaction
            DB::beginTransaction();

            // Update status approval untuk dosen yang dipilih
            $updatedCount = Dosen::whereIn('id', $validated['ids'])
                ->update([
                    'is_approve' => $validated['is_approve'],
                    'updated_at' => now()
                ]);

            // Commit transaction
            DB::commit();

            // Log aktivitas
            Log::info('Bulk approval dosen', [
                'user_id' => auth()->id(),
                'dosen_ids' => $validated['ids'],
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
            Log::error('Error bulk approval dosen', [
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

    public function destroy(Dosen $dosen)
    {
        $dosen->delete();
        return back();
    }
    public function index()
    {
        $dosen = Dosen::with('user')->get();

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
        return Inertia::render('Admin/Dosen/Form', ["prodi" => $prodi, "isEditing" => $isEditing, "dosen" => $dosen->load('user')]);
    }

    public function update(Request $request, Dosen $dosen)
    {
        $data = $request->all();
        if ($request->foto) {
            $data['foto'] = $request->file('foto')->store('foto_dosen');
        }
        $dosen->update($data);

        User::where('id', $dosen->user_id)->update([
            'name' => $request->nama,
            'email' => $request->email,
        ]);
        if ($request->password) {
            $request->validate([
                'password' => 'confirmed',
            ]);

            User::where('id', $dosen->user_id)->update([
                'password' => bcrypt($request->password)
            ]);
        }
        return redirect('admin/dosen');
    }

    public function store(Request $request)
    {
        $data = $request->all();
        if ($request->foto) {
            $data['foto'] = $request->file('foto')->store('foto_dosen');
        }

        $user = User::create([
            "name" => $request->nama,
            "email" => $request->email,
            "password" => bcrypt($request->password)
        ]);
        $data['user_id'] = $user->id;
        Dosen::create($data);
        return redirect('admin/dosen');
    }
}
