<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SalesController extends Controller
{
    public function index() {
        return Inertia::render('Sales/List');
    }

    public function detail($id) {
        return Inertia::render('Sales/Detail', ['id' => $id]);
    }

    public function create() {
        return Inertia::render('Sales/Create');
    }

    public function edit($id) {
        return Inertia::render('Sales/Edit', ['id' => $id]);
    }
}
