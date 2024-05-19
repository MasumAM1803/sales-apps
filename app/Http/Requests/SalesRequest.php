<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'stock' => 'required|integer',
            'type' => 'required|string|max:255',
            'total_sales' => 'required|integer',
            'transaction_date' => 'required|string',
            'product_id' => 'required|exists:App\Models\Products,id',
        ];
    }
}
