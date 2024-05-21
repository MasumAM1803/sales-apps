<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SalesController extends Controller
{
    public function index() {
        return Inertia::render('Sales/List');
    }

    public function detail() {
        return Inertia::render('Sales/Detail');
    }

    public function create() {
        return Inertia::render('Sales/Create');
    }

    public function edit() {
        return Inertia::render('Sales/Edit');
    }
}
