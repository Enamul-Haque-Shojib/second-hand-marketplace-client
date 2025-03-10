/* eslint-disable @typescript-eslint/no-explicit-any */
// import ManageProductDetails from '@/components/modules/productDetails/ManageProductDetails';
// import { getSingleProduct } from '@/services/itemService';
// import React from 'react';

// // Define an interface for params
// interface ProductDetailsParams {
//   productId: string;
// }

// const ProductDetails = async ({ params }: { params: ProductDetailsParams }) => {
//   const { productId } = params;
//   const { data: product } = await getSingleProduct(productId);
  

//   return (
//     <div className='w-[90%] mx-auto'>
//       <ManageProductDetails product={product} />
//     </div>
//   );
// };

// export default ProductDetails;


import ManageProductDetails from '@/components/modules/productDetails/ManageProductDetails';
import { getSingleProduct } from '@/services/itemService';
import React from 'react';



const ProductDetails = async ({ params }: any) => {
  const { productId } : any = params;
  const { data: product } = await getSingleProduct(productId);

  return (
    <div className="w-[90%] mx-auto">
      <ManageProductDetails product={product} />
    </div>
  );
};

export default ProductDetails;



