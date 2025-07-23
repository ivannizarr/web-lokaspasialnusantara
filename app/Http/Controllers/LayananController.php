<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class LayananController extends Controller
{
    public function index()
    {
        return Inertia::render('layanan/index', ['activeSection' => null]);
    }

    public function section($section)
    {
        $valid = [
            'foto-udara', 'internet-of-things', 'inspeksi-teknik',
            'penelitian', 'agrikultur', 'telematika', 'website-aplikasi', 'layanan-lainnya'
        ];
        abort_unless(in_array($section, $valid), 404);

        return Inertia::render('layanan/index', ['activeSection' => $section]);
    }
}
