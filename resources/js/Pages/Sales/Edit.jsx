import { Link, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function Edit({ id }) {
    const [salesId, setSalesId] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState(0);

    const fetchSales = () => {
        axios.get(`http://127.0.0.1:8000/api/sales/${id}`)
        .then((res) => {
            const data = res.data.data[0];
            setSalesId(data.id)
            setProductId(data.product_id)
            setQuantity(data.total_sales)
        })
    }

    useEffect(() => {
        fetchSales();
    }, []);

    const updateSales = async (e) => {
        e.preventDefault();

        const data = {
            product_id: productId,
            total_sales: quantity,
        }
        
        axios.put(`http://127.0.0.1:8000/api/sales/${salesId}`, data)
        .then((res) => {
            alert('Quantity Edited Successfully')
            window.location.replace(route('sales.list'))
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <Head title="Sales - Edit" />
            
            <div className="min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className='grid grid-cols-2 justify-between'>
                        <div>
                            <h1 className='text-2xl font-extrabold'>SIMULATION SHOP</h1>
                        </div>
                    </div>
                    
                    <div className="p-6 mt-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <form onSubmit={updateSales}>
                            <div className='mb-6'>
                                <label htmlFor="Kuantitas" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kuantitas</label>
                                <input type="text" id="name" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className='flex items-center justify-end gap-4'>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                                <Link href={route('sales.list')}>
                                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="flex justify-center mt-16 px-6 sm:items-center sm:justify-between">
                        <div className="text-center text-sm sm:text-start">&nbsp;</div>

                        <div className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-end sm:ms-0">
                            Test Recruitment PT Qtasnim @2024
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
