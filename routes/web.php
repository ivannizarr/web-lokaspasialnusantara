<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

// beranda
Route::get('/', fn () => Inertia::render('home'))->name('home');

// tentang kami
Route::get('/tentang-kami', fn () =>
    Inertia::render('tentang-kami/index', ['activeSection' => null])
)->name('tentang-kami');

Route::get('/tentang-kami/{section}', function ($section) {
    $valid = ['siapa-kami', 'aktivitas-kami', 'mitra', 'karir', 'administrasi'];
    abort_unless(in_array($section, $valid), 404);

    return Inertia::render('tentang-kami/index', ['activeSection' => $section]);
})->name('tentang-kami.section');

// detail mitra
Route::get('/tentang-kami/mitra/{slug}', function ($slug) {
    $path = public_path('data/mitra.json');
    if (!File::exists($path)) abort(404);

    $mitra = collect(json_decode(File::get($path), true))
        ->firstWhere('slug', $slug);

    abort_unless($mitra, 404);

    return Inertia::render('tentang-kami/mitra-detail', ['partner' => $mitra]);
})->name('mitra.detail');

// layanan
Route::get('/layanan', fn () =>
    Inertia::render('layanan/index', ['activeSection' => null])
)->name('layanan');

Route::get('/layanan/{section}', function ($section) {
    $valid = ['foto-udara', 'internet-of-things', 'inspeksi-teknik', 'penelitian', 'agrikultur', 'telematika', 'website-aplikasi', 'layanan-lainnya'];
    abort_unless(in_array($section, $valid), 404);

    return Inertia::render('layanan/index', ['activeSection' => $section]);
})->name('layanan.section');

// informasi
Route::prefix('informasi')->name('informasi.')->group(function () {
    Route::get('publikasi',    fn () => Inertia::render('informasi/publikasi'))->name('publikasi');
    Route::get('hasil-proyek', fn () => Inertia::render('informasi/hasil-proyek'))->name('hasil-proyek');
});

// produk
Route::prefix('produk')->name('produk.')->group(function () {
    Route::get('rumah-teknologi', fn () => Inertia::render('produk/rumah-teknologi'))->name('rumah-teknologi');
    Route::get('genesis-data',    fn () => Inertia::render('produk/genesis-data'))->name('genesis-data');
});

// hubungi Kami
Route::get('/hubungi-kami', fn () => Inertia::render('hubungi-kami'))->name('contact');

// DASHBOARD
Route::get('/dashboard/{section?}', function ($section = null) {
    return Inertia::render('dashboard', [
        'section' => $section,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
