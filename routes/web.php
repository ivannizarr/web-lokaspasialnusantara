<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Beranda
Route::get('/', fn () => Inertia::render('home'))->name('home');

// Tentang Kami
Route::get('/tentang-kami', fn () => 
    Inertia::render('tentang-kami/index', [
        'activeSection' => null
    ])
)->name('tentang-kami');

// Akses ke section
Route::get('/tentang-kami/{section}', function ($section) {
    $validSections = ['siapa-kami', 'aktivitas-kami', "mitra", 'karir'];

    if (!in_array($section, $validSections)) {
        abort(404);
    }

    return Inertia::render('tentang-kami/index', [
        'activeSection' => $section
    ]);
})->name('tentang-kami.section');

// Layanan
Route::get('/layanan', fn () =>
    Inertia::render('layanan/index')
)->name('layanan');

// Informasi
Route::prefix('informasi')->name('informasi.')->group(function () {
    Route::get('publikasi',    fn () => Inertia::render('informasi/publikasi'))->name('publikasi');
    Route::get('hasil-proyek', fn () => Inertia::render('informasi/hasil-proyek'))->name('hasil-proyek');
});

// Produk
Route::prefix('produk')->name('produk.')->group(function () {
    Route::get('rumah-teknologi', fn () => Inertia::render('produk/rumah-teknologi'))->name('rumah-teknologi');
    Route::get('genesis-data',    fn () => Inertia::render('produk/genesis-data'))->name('genesis-data');
});

// Hubungi Kami
Route::get('/hubungi-kami', fn () => Inertia::render('hubungi-kami'))->name('contact');



// DASHBOARD

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
