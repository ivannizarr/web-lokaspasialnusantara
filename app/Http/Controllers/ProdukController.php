<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProdukController extends Controller
{
    public function rumahTeknologi()
    {
        return Inertia::render('produk/rumah-teknologi');
    }

    public function genesisData()
    {
        return Inertia::render('produk/genesis-data');
    }
}
