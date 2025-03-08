"use client"
import React from 'react';
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
  } from "@/components/ui/avatar"
import { UserRound } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { addTransaction } from '@/services/TransactionService';
import { toast } from 'sonner';



const ManageProductDetails = ({product}) => {
  const {user} = useUser();

    const {_id,title, description, image, condition, category, price, userId, status} = product;

    const handleTransaction = async() =>{
      try {
        const transactionData = {
          buyerId: user?._id,
          sellerId: userId?._id,
          itemId: _id
        }
        console.log(transactionData);
        const res = await addTransaction(transactionData);
        toast.success('successfully transaction')
      } catch (error) {
        toast.error(error.message)
      }
      
      
    }

    return (
        <div>
             <Card className="flex flex-col lg:flex-row shadow-lg hover:shadow-xl transition-all overflow-hidden flex-grow">
        <div className="lg:w-1/2 p-5">
          <AspectRatio ratio={16 / 9} className="bg-muted border">
            <Image
              src={image}
              alt={title}
              fill
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
          <div className='flex'>
          <Avatar>
      <AvatarImage src={userId?.authImgUrl} alt='user' />
      <AvatarFallback><UserRound></UserRound></AvatarFallback>
    </Avatar>
    <div>
    <h1>{userId?.authName}</h1>
    <p>{userId?.email}</p>
    </div>
    
          </div>
          
        </div>
        <div className="p-6 lg:w-1/2 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="mt-2 text-gray-600">{description}</CardDescription>
          </CardHeader>
          <CardContent>
          <p>Category: {category}</p>
        <p>Condition: {condition}</p>
        <p>Price: {price}</p>
        <p>Status: {status}</p>
          </CardContent>
          <CardFooter className="flex gap-4 mt-4">
      
              <Button variant="outline" onClick={handleTransaction}>Buy Now</Button>
        
           
          </CardFooter>
        </div>
            </Card>
        </div>
    );
};

export default ManageProductDetails;