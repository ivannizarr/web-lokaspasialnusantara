<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TentangKamiController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\InformasiController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\DashboardController;

// beranda
Route::get('/', [TentangKamiController::class, 'home'])->name('home');

// tentang kami
Route::prefix('tentang-kami')->name('tentang-kami.')->group(function () {
    Route::get('/', [TentangKamiController::class, 'index']);
    Route::get('/{section}', [TentangKamiController::class, 'section'])->name('section');
    Route::get('/mitra/{slug}', [TentangKamiController::class, 'mitraDetail'])->name('mitra.detail');
});

// layanan
Route::prefix('layanan')->name('layanan.')->group(function () {
    Route::get('/', [LayananController::class, 'index']);
    Route::get('/{section}', [LayananController::class, 'section'])->name('section');
});

// informasi
Route::prefix('informasi')->name('informasi.')->group(function () {
    Route::get('/publikasi', [InformasiController::class, 'publikasi'])->name('publikasi');
    Route::get('/hasil-proyek', [InformasiController::class, 'hasilProyek'])->name('hasil-proyek');
});

// produk
Route::prefix('produk')->name('produk.')->group(function () {
    Route::get('/rumah-teknologi', [ProdukController::class, 'rumahTeknologi'])->name('rumah-teknologi');
    Route::get('/genesis-data', [ProdukController::class, 'genesisData'])->name('genesis-data');
});

// hubungi kami
Route::get('/hubungi-kami', fn () => Inertia\Inertia::render('hubungi-kami'))->name('contact');

// dashboard
Route::get('/dashboard/{section?}', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
