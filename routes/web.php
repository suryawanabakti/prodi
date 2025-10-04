<?php

use App\Http\Controllers\AdminAlumniController;
use App\Http\Controllers\AdminBeritaController;
use App\Http\Controllers\AdminDosenController;
use App\Http\Controllers\AdminMataKuliahController;
use App\Http\Controllers\AdminProdiController;
use App\Http\Controllers\AdminUnduhanController;
use App\Http\Controllers\KurikulumController;
use App\Http\Controllers\ProfilLulusanController;
use App\Http\Controllers\TujuanController;
use App\Http\Resources\ProdiResource;
use App\Models\Alumni;
use App\Models\Berita;
use App\Models\Dosen;
use App\Models\MataKuliah;
use App\Models\Prodi;
use App\Models\ProfilLulusan;
use App\Models\Tujuan;
use App\Models\Unduhan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/visi-misi', function () {
    return Inertia::render("visi-misi", ["prodi" => Prodi::first()]);
})->name('visi-misi');
Route::get('/struktur', function () {
    return Inertia::render("struktur", ["prodi" => Prodi::first()]);
})->name('struktur');
Route::get('/', function () {
    $prodi = ProdiResource::make(Prodi::first());
    $dosen = Dosen::all();
    $berita = Berita::all();
    $mataKuliah = MataKuliah::all();
    $tujuan = Tujuan::all();
    $profilLulusan = ProfilLulusan::all();
    return Inertia::render('welcome', [
        "prodi" => $prodi,
        "dosen" => $dosen,
        "berita" => $berita,
        "mataKuliah" => $mataKuliah,
        "tujuan" => $tujuan,
        "profilLulusan" => $profilLulusan,
    ]);
})->name('home');

Route::get('/profil-lulusan', [ProfilLulusanController::class, 'index2'])->name('profil-lulusan');
Route::get('/tujuan', [TujuanController::class, 'index2'])->name('tujuan');


Route::get('/dosen', function () {
    $dosen = Dosen::all();
    return Inertia::render('Dosen/Index', [
        "dosen" => $dosen,
    ]);
})->name('dosen');

Route::get('/alumni', function () {
    $alumni = Alumni::all();
    return Inertia::render('Alumni/Index', [
        "alumni" => $alumni,
    ]);
})->name('alumni');

Route::get('/mata-kuliah', function () {
    $mataKuliah = MataKuliah::with('kurikulum', 'dosen')->get();
    return Inertia::render('MataKuliah/Index', [
        "mataKuliah" => $mataKuliah,
    ]);
})->name('mataKuliah');

Route::get('/berita', function () {
    $berita = Berita::all();
    return Inertia::render('Berita/Index', [
        "berita" => $berita,
    ]);
})->name('berita');

Route::get('/berita/{berita}', function (Berita $berita) {
    return Inertia::render('Berita/Show', [
        "berita" => $berita,
    ]);
})->name('berita');

Route::get('/unduhan', function (Berita $berita) {
    return Inertia::render('Unduhan/Index', [
        "unduhan" => Unduhan::all(),
    ]);
})->name('unduhan');

Route::get('admin/unduhan/{unduhan}/download', [AdminUnduhanController::class, 'download'])->name('admin.unduhan.download');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $totalStats = [
            "dosen" => Dosen::count(),
            "berita" => Berita::count(),
            "mataKuliah" => MataKuliah::count(),
        ];
        return Inertia::render('dashboard', ["totalStats" => $totalStats]);
    })->name('dashboard');

    Route::get('admin/berita', [AdminBeritaController::class, 'index'])->name('admin.berita.index');
    Route::get('admin/berita/create', [AdminBeritaController::class, 'create'])->name('admin.berita.create');
    Route::put('admin/berita/approve', [AdminBeritaController::class, 'approve'])->name('admin.berita.approve');
    Route::post('admin/berita', [AdminBeritaController::class, 'store'])->name('admin.berita.store');

    Route::get('admin/berita', [AdminBeritaController::class, 'index'])->name('admin.berita.index');
    Route::get('admin/berita/create', [AdminBeritaController::class, 'create'])->name('admin.berita.create');
    Route::post('admin/berita', [AdminBeritaController::class, 'store'])->name('admin.berita.store');
    Route::get('admin/berita/{berita}/edit', [AdminBeritaController::class, 'edit'])->name('admin.berita.edit');
    Route::put('admin/berita/{berita}', [AdminBeritaController::class, 'update'])->name('admin.berita.update');
    Route::delete('admin/berita/{berita}', [AdminBeritaController::class, 'destroy'])->name('admin.berita.destroy');

    Route::get('admin/dosen', [AdminDosenController::class, 'index'])->name('admin.dosen.index');
    Route::get('admin/dosen/create', [AdminDosenController::class, 'create'])->name('admin.dosen.create');
    Route::put('admin/dosen/approve', [AdminDosenController::class, 'approve'])->name('admin.dosen.approve');
    Route::post('admin/dosen', [AdminDosenController::class, 'store'])->name('admin.dosen.store');
    Route::get('admin/dosen/{dosen}/edit', [AdminDosenController::class, 'edit'])->name('admin.dosen.edit');
    Route::post('admin/dosen/{dosen}', [AdminDosenController::class, 'update'])->name('admin.dosen.update');
    Route::delete('admin/dosen/{dosen}', [AdminDosenController::class, 'destroy'])->name('admin.dosen.destroy');

    Route::resource('admin/kurikulums', KurikulumController::class);
    Route::put('/admin/kurikulum/approve', [KurikulumController::class, 'approve'])
        ->name('admin.kurikulum.approve');



    Route::resource('admin/unduhan', AdminUnduhanController::class)->names('admin.unduhan');

    Route::get('admin/mata-kuliah', [AdminMataKuliahController::class, 'index'])->name('admin.mata-kuliah.index');
    Route::get('admin/mata-kuliah/create', [AdminMataKuliahController::class, 'create'])->name('admin.mata-kuliah.create');
    Route::put('/admin/mata-kuliah/approve', [AdminMataKuliahController::class, 'approve'])
        ->name('admin.mata-kuliah.approve');
    Route::post('admin/mata-kuliah', [AdminMataKuliahController::class, 'store'])->name('admin.mata-kuliah.store');
    Route::get('admin/mata-kuliah/{matakuliah}/edit', [AdminMataKuliahController::class, 'edit'])->name('admin.mata-kuliah.edit');
    Route::put('admin/mata-kuliah/{matakuliah}', [AdminMataKuliahController::class, 'update'])->name('admin.mata-kuliah.update');
    Route::delete('admin/mata-kuliah/{matakuliah}', [AdminMataKuliahController::class, 'destroy'])->name('admin.mata-kuliah.destroy');


    Route::get('admin/prodi', [AdminProdiController::class, 'edit'])->name('admin.prodi.index');
    Route::post('admin/prodi', [AdminProdiController::class, 'update'])->name('admin.prodi.update');

    Route::get('admin/alumni', [AdminAlumniController::class, 'index'])->name('admin.alumni.index');
    Route::get('admin/alumni/create', [AdminAlumniController::class, 'create'])->name('admin.alumni.create');
    Route::put('/admin/alumni/approve', [AdminAlumniController::class, 'approve'])
        ->name('admin.alumni.approve');
    Route::get('export-alumni', [AdminAlumniController::class, 'export'])->name('admin.alumni.export');
    Route::post('admin/alumni', [AdminAlumniController::class, 'store'])->name('admin.alumni.store');
    Route::get('admin/alumni/{alumni}/edit', [AdminAlumniController::class, 'edit'])->name('admin.alumni.edit');
    Route::put('admin/alumni/{alumni}', [AdminAlumniController::class, 'update'])->name('admin.alumni.update');
    Route::delete('admin/alumni/{alumni}', [AdminAlumniController::class, 'destroy'])->name('admin.alumni.destroy');

    // Tujuan routes
    Route::prefix('admin')->name('admin.')->middleware(['auth'])->group(function () {

        // Tujuan routes
        Route::resource('tujuan', TujuanController::class);

        // Profil Lulusan routes
        Route::resource('profil-lulusan', ProfilLulusanController::class);
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
