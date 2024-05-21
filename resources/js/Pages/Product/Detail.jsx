import { Link, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function Detail({ id }) {
    const [product, setProduct] = useState([]);

    const fetchProduct = () => {
        axios.get(`http://127.0.0.1:8000/api/product/${id}`)
        .then((res) => {
            setProduct(res.data.data);
        })
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <>
            <Head title="Welcome" />
            
            <div className="min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className='grid grid-cols-2 justify-between'>
                        <div>
                            <h1 className='text-2xl font-extrabold'>SIMULATION SHOP</h1>
                        </div>
                    </div>

                    <Link href={route('product.list')}>
                        <button className='flex items-center gap-1 px-3 py-2 mt-8 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'>
                            <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                            </svg>

                            Back
                        </button>
                    </Link>
                    
                    <div className="max-w-lg p-6 mt-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    {
                        product.map((item) => (
                            <>
                                <div className='mb-6'>
                                    <label for="Nama Barang" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Barang</label>
                                    <input type="text" id="name" value={item.name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled readonly />
                                </div>
                                <div className='mb-6'>
                                    <label for="Jenis Barang" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Barang</label>
                                    <input type="text" id="name" value={item.type} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled readonly />
                                </div>
                                <div>
                                    <label for="Stok Barang" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stok Barang</label>
                                    <input type="text" id="name" value={item.stock} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled readonly />
                                </div>
                            </>
                        ))
                    }
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
