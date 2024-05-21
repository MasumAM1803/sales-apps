import { Link, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function List() {
    const [product, setProduct] = useState([]);

    const fetchProduct = () => {
        axios.get('http://127.0.0.1:8000/api/product')
        .then((res) => {
            setProduct(res.data.data);
        })
    }

    const deleteProduct = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/product/${id}`)
        .then((res) => {
            alert('Product Deleted Successfully')
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchProduct();
    }, [deleteProduct]);

    return (
        <>
            <Head title="Welcome" />
            
            <div className="min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className='grid grid-cols-2 justify-between'>
                        <Link href={route('home')}>
                            <h1 className='text-2xl font-extrabold'>SIMULATION SHOP</h1>
                        </Link>
                    </div>
                    <div className="mt-16">
                        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                            <Link href={route('product.create')}>
                                <button className='flex items-center gap-1 px-3 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
                                    </svg>
                                    Add
                                </button>
                            </Link>
                            <div>
                                <label htmlFor="table-search" className="sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Product Items..." />
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-3">No</th>
                                        <th className="px-6 py-3">Nama Barang</th>
                                        <th className="px-6 py-3">Jenis Barang</th>
                                        <th className="px-6 py-3">Stok</th>
                                        <th className="px-6 py-3">
                                            Total Terjual
                                            <p>
                                            (<Link href={route('product.compare.list')} className='lowercase text-blue-500'>
                                                Lihat Perbandingan
                                            </Link>)
                                            </p>
                                        </th>
                                        <th className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.map((item, index) => (
                                            <tr key={index} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                                                <td className='px-6 py-4'>{index+1}</td>
                                                <td className='px-6 py-4'>
                                                    <Link href={route('product.detail', item.id)} className='flex'>
                                                        {item.name}
                                                    </Link>
                                                </td>
                                                <td className='px-6 py-4'>{item.type}</td>
                                                <td className='px-6 py-4'>{item.stock}</td>
                                                <td className='px-6 py-4'>{item.total_sales}</td>
                                                <td className='flex gap-4 px-6 py-4'>
                                                    <Link href={route('product.edit', item.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                                    <button onClick={() => deleteProduct(item.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
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
