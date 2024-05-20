<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SalesRequest;
use App\Models\Product;
use App\Models\Sales;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalesController extends Controller
{
    public function index()
    {
        $sales = DB::table('sales', 's')
            ->selectRaw('s.id, p.name, p.stock, s.total_sales, s.transaction_date, p.type')
            ->join('products AS p', 'p.id', '=', 's.product_id')
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
        $sales = DB::table('sales', 's')
            ->selectRaw('s.id, p.name, p.stock, s.total_sales, s.transaction_date, p.type')
            ->join('products AS p', 'p.id', '=', 's.product_id')
            ->where('s.id', $id)
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

        $product = Product::find($request->product_id);

        if ($product->stock) {
            $product->decrement('stock', $request->total_sales);
        }

        $sales = Sales::create([
            'product_id' => $request->product_id,
            'total_sales' => $request->total_sales,
            'transaction_date' => $request->transaction_date,
        ]);

        if ($product && $sales) {
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
        $product = Product::find($request->product_id);

        $sales = Sales::find($id);
        $new_total_sales = $sales->total_sales - $request->total_sales;

        if ($sales->total_sales > $request->total_sales) {
            $product->increment('stock', abs($new_total_sales));
        } elseif ($sales->total_sales < $request->total_sales){
            $product->decrement('stock', abs($new_total_sales));
        }

        $sales->update([
                'total_sales' => $request->total_sales,
                'transaction_date' => $request->transaction_date,
            ]);
        
        if ($product && $sales) {
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
        $sales = Sales::find($id);
        
        if ($sales) {
            Product::where('id', $sales->product_id)
                ->increment('stock', $sales->total_sales);

            $sales->delete();
            
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
