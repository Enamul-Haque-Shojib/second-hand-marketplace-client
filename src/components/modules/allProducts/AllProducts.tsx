"use client"


import { getAllItems } from '@/services/itemService';
import React, { useEffect, useState } from 'react';
import Product from './Product';

const AllProducts = () => {

    const [products, setProducts] = useState([])


    useEffect(()=>{

        const getItemData = async()=>{
            const res = await getAllItems();
            setProducts(res?.data);
        }
       getItemData();
       
    },[])
    return (
        <div className='w-full bg-white rounded-lg p-6"'>
            <h1>All products</h1>
            <div className='grid grid-cols-3 gap-5'>
            {
                products.map((product) =>
                <Product 
                key={product._id}
                product = {product}
                ></Product>
                )
            }
            
            </div>
        </div>
    );
};

export default AllProducts;