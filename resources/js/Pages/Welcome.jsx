import { Link, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [product, setProduct] = useState([]);
    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

    const fetchProduct = () => {
        axios.get('http://127.0.0.1:8000/api/product')
        .then((res) => {
            setProduct(res.data.data);
        })
    }

    const addToCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

        if (isItemInCart) {
        setCartItems(
            cartItems.map((cartItem) =>
            cartItem.id === item.id
                ? { ...cartItem, total_sales: cartItem.total_sales + 1 }
                : cartItem
            )
        );
        } else {
            setCartItems([...cartItems, { id:item.id, name:item.name, type:item.type, total_sales: 1 }]);
        }
    };

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }, [cartItems]);

    useEffect(() => {
        fetchProduct();
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
            setCartItems(JSON.parse(cartItems));
        }
    }, []);

    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {
                            product.map((item, index) => (
                                <div className="flex justify-between items-center" key={index}>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col">
                                            <h1 className="text-lg font-bold">{item.name}</h1>
                                        </div>
                                        </div>
                                        <div className="flex gap-4">
                                        <button
                                            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                            onClick={() => {
                                            addToCart(item)
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                        <Link
                                href={route('cart')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Cart
                        </Link>
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
