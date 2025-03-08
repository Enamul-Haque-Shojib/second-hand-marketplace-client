import ManageProductDetails from '@/components/modules/productDetails/ManageProductDetails';
import { getSingleProduct } from '@/services/itemService';
import React from 'react';

const ProductDetails = async({params}) => {
 
    const {productId} = await params;
    const { data: product } = await getSingleProduct(productId);
    console.log(product);

    return (
        <div className='w-[90%] mx-auto'>
         <ManageProductDetails product={product}></ManageProductDetails>
        </div>
    );
};

export default ProductDetails;