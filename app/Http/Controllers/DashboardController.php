<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index($section = null)
    {
        return Inertia::render('dashboard', [
            'section' => $section
        ]);
    }
}
