import AllProducts from '@/components/modules/allProducts/AllProducts';
import Categories from '@/components/modules/categories/Categories';
import React from 'react';

const ManageProducts = () => {
    return (
        <div className='w-[95%] mx-auto'>
            <h1>All Products</h1>
            <div className='flex lg:flex-row flex-col lg:justify-center lg:items-start gap-x-5'>
                <Categories></Categories>
                <AllProducts></AllProducts>
            </div>
        </div>
    );
};

export default ManageProducts;