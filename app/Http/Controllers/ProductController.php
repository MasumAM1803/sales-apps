<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index() {
        return Inertia::render('Product/List');
    }

    public function detail($id) {
        return Inertia::render('Product/Detail', ['id' => $id]);
    }

    public function create() {
        return Inertia::render('Product/Create');
    }

    public function edit($id) {
        return Inertia::render('Product/Edit', ['id' => $id]);
    }
}
