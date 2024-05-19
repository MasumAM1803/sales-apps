<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SalesRequest;
use App\Models\Product;
use App\Models\Sales;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    public function index()
    {
        $sales = Sales::join('products', 'products.id', '=', 'sales.product_id')
            ->get();

        if ($sales) {
            return response()->json([
                'status'=> 'success',
                'message' => 'Sales Retrieved',
                'data'=> $sales
            ]);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Sales Failed to Retrieve']);
        }
    }

    public function show($id)
    {
        $sales = Sales::join('products', 'products.id', '=', 'sales.product_id')
            ->where('sales.id', $id)
            ->get();

         if ($sales) {
            return response()->json([
                'status'=> 'success',
                'message' => 'Activity Retrieved',
                'data'=> $sales
            ]);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Activity Failed to Retrieve']);
        }
    }

    public function store(SalesRequest $request) 
    {
        $product = Product::create([
            'name' => $request->name,
            // 'stock' => $request->stock,
            'type' => $request->type
        ]);

        if ($product->stock) {
            // $product->stock->increment('quantity', $request->quantity);
            $product->stock->decrement('quantity', $request->total_sales);
        }
        // } else {
        //     Stock::create($request->all());
        // }

        $sales = Sales::create([
            'product_id' => $request->product_id,
            'total_sales' => $request->total_sales,
            'transaction_date' => $request->transaction_date,
        ]);

        if ($product || $sales) {
            return response()->json([
                'status'=>'success',
                'message' => 'Add Sales Successfully']);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Add Sales Failed']);
        }
    }

    public function update(SalesRequest $request, $id) 
    {
        $sales = Sales::join('products', 'products.id', '=', 'sales.product_id')
            ->where('sales.id', $id)
            ->update([
                'products.name' => $request->name,
                'products.stock' => $request->stock,
                'products.type' => $request->type,
                'sales.total_sales' => $request->total_sales,
                'sales.transaction_date' => $request->transaction_date,
                'sales.product_id' => $request->product_id,
            ]);
        
        
        if ($sales) {
            return response()->json([
                'status'=>'success',
                'message' => 'Edit Sales Successfully']);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Edit Sales Failed']);
        }
    }

    public function destroy($id)
    {
        $sales = Sales::join('products', 'products.id', '=', 'sales.product_id')
            ->where('sales.id', $id)
            ->get();
        
        if ($sales) {
            Sales::where('id', $id)->delete();
            Product::where('id', $sales->product_id)
                ->update([
                    'products.stock' => $request->stock,
                    'products.type' => $request->type
                ]);

            return response()->json([
                'status'=>'success',
                'message' => 'Delete Sales Successfully']);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Delete Sales Failed']);
        }
    }
}
