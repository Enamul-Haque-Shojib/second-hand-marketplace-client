// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"
// import React, { useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import Image from 'next/image';
// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
// } from "@/components/ui/avatar";
// import { UserRound } from 'lucide-react';
// import { useUser } from '@/context/UserContext';
// import { addTransaction } from '@/services/TransactionService';
// import { toast } from 'sonner';
// import { TItem } from '@/types/item';  // Import the correct type for product

// interface ManageProductDetailsProps {
//   product: TItem;  // Explicitly type the product prop
// }

// const ManageProductDetails: React.FC<ManageProductDetailsProps> = ({ product }) => {
//   const { user, isLoading, setIsLoading } = useUser();
  
//   const { _id, title, description, image, condition, category, price, userId, status } = product;
//   useEffect(() => {
//     if(product) setIsLoading(false);
//   },[product, setIsLoading])

//   const handleTransaction = async () => {
//     try {
//       const transactionData = {
//         buyerId: user?._id,
//         sellerId: userId?._id,
//         itemId: _id,
//       };
      
//       await addTransaction(transactionData);
      
//       toast.success('Successfully completed transaction');
//     } catch (error:any) {
//       toast.error(error.message);
//     }
//   };
//   if(isLoading){
//     return <p>Loading.....</p>
//   }

  

//   return (
//     <div>
//       <Card className="flex flex-col lg:flex-row shadow-lg hover:shadow-xl transition-all overflow-hidden flex-grow">
//         <div className="lg:w-1/2 p-5">
//           <AspectRatio ratio={16 / 9} className="bg-muted border">
//             <Image
//               src={image}
//               alt={title}
//               fill
//               className="h-full w-full rounded-md object-cover"
//             />
//           </AspectRatio>
//           <div className='flex'>
//             <Avatar>
//               <AvatarImage src={userId?.authImgUrl} alt='user' />
//               <AvatarFallback><UserRound /></AvatarFallback>
//             </Avatar>
//             <div>
//               <h1>{userId?.authName}</h1>
//               <p>{userId?.email}</p>
//             </div>
//           </div>
//         </div>
//         <div className="p-6 lg:w-1/2 flex flex-col justify-between">
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold">{title}</CardTitle>
//             <CardDescription className="mt-2 text-gray-600">{description}</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p>Category: {category}</p>
//             <p>Condition: {condition}</p>
//             <p>Price: {price}</p>
//             <p>Status: {status}</p>
//           </CardContent>
//           <CardFooter className="flex gap-4 mt-4">
//             {
//               user &&  (user?._id !== userId?._id  && ( 
//                 <Button variant="outline" onClick={handleTransaction}>
//                   Buy Now
//                 </Button>
//                ) )
//             }
 
// </CardFooter>

//         </div>
//       </Card>
//     </div>
//   );
// };

// export default ManageProductDetails;


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from 'next/image';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { UserRound } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { addTransaction } from '@/services/TransactionService';
import { toast } from 'sonner';
import { TItem } from '@/types/item';  // Import the correct type for product

interface ManageProductDetailsProps {
  product: TItem;  // Explicitly type the product prop
}

const ManageProductDetails: React.FC<ManageProductDetailsProps> = ({ product }) => {
  const { user, isLoading, setIsLoading } = useUser();
  
  const { _id, title, description, image, condition, category, price, userId, status } = product;
  // const [statusItem, setStatusItem] = useState(status)
  useEffect(() => {
    if(product) setIsLoading(false);
  },[product, setIsLoading])

  const handleTransaction = async () => {
    try {
      const transactionData = {
        buyerId: user?._id,
        sellerId: userId?._id,
        itemId: _id,
      };
      
      const res = await addTransaction(transactionData);
      if(res.success){
        toast.success(res.message);
      }else{
        toast.warning(res.message);
      }
      
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  if(isLoading){
    return <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-300">Loading...</p>
  }
  
  return (
    <div className="container mx-auto px-4 my-12">
      <Card className="flex flex-col lg:flex-row shadow-lg hover:shadow-xl transition-all overflow-hidden rounded-lg">
        <div className="lg:w-1/2 p-5 flex flex-col items-center">
          <AspectRatio ratio={16 / 9} className="bg-muted border rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </AspectRatio>
          <div className='flex items-center gap-4 mt-4 p-4 border rounded-lg w-full'>
            <Avatar>
              <AvatarImage src={userId?.authImgUrl} alt='user' />
              <AvatarFallback><UserRound /></AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-gray-800 dark:text-white">{userId?.authName}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{userId?.email}</p>
            </div>
          </div>
        </div>
        <div className="p-6 lg:w-1/2 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">{title}</CardTitle>
            <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">{description}</CardDescription>
          </CardHeader>
          <CardContent className="text-gray-800 dark:text-gray-300 space-y-2">
            <p><span className="font-semibold">Category: </span> {category}</p>
            <p><span className="font-semibold">Condition: </span> {condition}</p>
            <p><span className="font-semibold">Price: </span> ${price}</p>
            <p><span className="font-semibold">Status: </span><span className={status==='Sold'?'text-red-600' : 'text-green-600'}>{status}</span></p>
          </CardContent>
          <CardFooter className="flex justify-center mt-4">
            {user && user?._id !== userId?._id && (
              <Button disabled={status==='Sold'} variant="default" size="lg" onClick={handleTransaction} className="px-6 py-2 text-lg">
                Buy Now
              </Button>
            )}
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default ManageProductDetails;
