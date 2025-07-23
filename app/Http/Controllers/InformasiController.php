<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class InformasiController extends Controller
{
    public function publikasi()
    {
        return Inertia::render('informasi/publikasi');
    }

    public function hasilProyek()
    {
        return Inertia::render('informasi/hasil-proyek');
    }
}
