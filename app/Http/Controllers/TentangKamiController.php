<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class TentangKamiController extends Controller
{
    public function home()
    {
        return Inertia::render('home');
    }

    public function index()
    {
        return Inertia::render('tentang-kami/index', ['activeSection' => null]);
    }

    public function section($section)
    {
        $valid = ['siapa-kami', 'aktivitas-kami', 'mitra', 'karir', 'administrasi'];
        abort_unless(in_array($section, $valid), 404);

        return Inertia::render('tentang-kami/index', ['activeSection' => $section]);
    }

    public function mitraDetail($slug)
    {
        $path = public_path('data/mitra.json');
        if (!File::exists($path)) abort(404);

        $mitra = collect(json_decode(File::get($path), true))
            ->firstWhere('slug', $slug);

        abort_unless($mitra, 404);

        return Inertia::render('tentang-kami/mitra-detail', ['partner' => $mitra]);
    }
}
