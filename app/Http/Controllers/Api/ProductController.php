<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();

        if ($products) {
            return response()->json([
                'status'=> 'success',
                'message' => 'Products Retrieved',
                'data'=> $products
            ]);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Products Failed to Retrieve']);
        }
    }

    public function show($id)
    {
        $product = Product::where('id', $id)
            ->get();

         if ($product) {
            return response()->json([
                'status'=> 'success',
                'message' => 'Product Retrieved',
                'data'=> $product
            ]);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Product Failed to Retrieve']);
        }
    }

    public function store(ProductRequest $request) 
    {
        $products = DB::table('products')
            ->select('name')
            ->pluck('name')
            ->toArray();
            
        if (in_array($request->name, $products)) {
            $product = Product::where('name', $request->name)
                ->increment('stock', $request->stock);
            
            if ($product) {
                return response()->json([
                    'status'=>'success',
                    'message' => 'Add Product Successfully']);
            } else {
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Add Product Failed']);
            }
        } else {
            $product = Product::create([
                'name' => $request->name,
                'stock' => $request->stock,
                'type' => $request->type,
            ]);

            if ($product) {
                return response()->json([
                    'status'=>'success',
                    'message' => 'Add Product Successfully']);
            } else {
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Add Product Failed']);
            }
        }
    }

    public function update(ProductRequest $request, $id) 
    {
        $product = Product::find($id);

        $product->update([
                'name' => $request->name,
                'stock' => $request->stock,
                'type' => $request->type,
            ]);
        
        if ($product) {
            return response()->json([
                'status'=>'success',
                'message' => 'Edit Product Successfully']);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Edit Product Failed']);
        }
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        
        if ($product) {
            $product->delete();
            
            return response()->json([
                'status'=>'success',
                'message' => 'Delete Product Successfully']);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Delete Product Failed']);
        }
    }
}
