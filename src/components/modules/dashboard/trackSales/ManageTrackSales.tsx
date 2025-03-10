
"use client"

import { useUser } from '@/context/UserContext';
import { getAllSales, updateTransaction } from '@/services/TransactionService';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { toast } from 'sonner';
interface Sale {
  _id: string;
  buyerId: {
    authName: string;
    email: string;
    authImgUrl: string;
  };
  itemId: {
    title: string;
    price: number;
    image: string;
  };
  status: string;
}
const ManageTrackSales = () => {
    const {user} = useUser();
    const [sales, setSales] = useState<Sale[]>([]);
     
        useEffect(() => {
          if (!user?._id) return;
            const getSalesData=async()=>{
                try {
                    const salesData = await getAllSales(user?._id)
                    setSales(salesData?.data)
                } catch (error) {
                    console.log(error)
                }
            }
            getSalesData();
        },[user?._id]);

    


        const handleComplete = async (id: string) => {
          try {
            const res = await updateTransaction(id);
        
            if (res?.success) {
              setSales((prevSales) =>
                prevSales.map((sale) => 
                  sale && typeof sale === "object" && sale._id === id
                    ? { ...sale, status: "Completed" } 
                    : sale
                )
              );
            }
            toast.success('Transaction completed successfully')
          } catch (error) {
            console.error("Error updating transaction:", error);
          }
        };

    return (
        <div>
            <h1>manage track sales </h1>
            <Table>
  <TableCaption>A list Items.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Product</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Buyer</TableHead>
      <TableHead>status</TableHead>
      <TableHead className='text-right'>Action</TableHead>
    
    </TableRow>
  </TableHeader>
  <TableBody>
    {
      sales?.map(({_id, buyerId, itemId, status})=> (
        <TableRow key={_id}>
        <TableCell className="font-medium">
          <div className='flex'>
          <AspectRatio ratio={16 / 9}>
          <Image src={itemId?.image} alt="Image" width={50} height={50} className="rounded-md object-cover" />
        </AspectRatio>
        <h1>{itemId?.title}</h1>
          </div>
      
          </TableCell>
      
        <TableCell>{itemId?.price}</TableCell>
        <TableCell className="">
        <div className='flex'>
          <AspectRatio ratio={16 / 9}>
          <Image src={buyerId?.authImgUrl} alt="Image" width={50} height={50} className="rounded-md object-cover" />
        </AspectRatio>
        <div>
        <h1>{buyerId?.authName}</h1>
        <p>{buyerId?.email}</p>
        </div>
        </div>
        
          </TableCell>
        <TableCell className="">{status}</TableCell>
        <TableCell className="text-right">
          <button className='btn border-t-cyan-400' onClick={()=>{handleComplete(_id)}}>Complete</button>
        </TableCell>
  
      </TableRow>
  
      ))
    }
   
  </TableBody>
</Table>
        </div>
    );
};

export default ManageTrackSales;