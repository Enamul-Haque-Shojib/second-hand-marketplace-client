"use client"

import { useUser } from '@/context/UserContext';
import { getAllPurchases } from '@/services/TransactionService';
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

const ManageTrackPurchase = () => {
    const {user} = useUser();
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {

        const getPurchaseData=async()=>{
            try {
                const purchaseData = await getAllPurchases(user?._id)
                setPurchases(purchaseData?.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPurchaseData();
    },[user?._id])


    return (
        <div>
            <h1>mange track purchase</h1>
            <Table>
  <TableCaption>A list Items.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Product</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Seller</TableHead>
      <TableHead>status</TableHead>
    
    </TableRow>
  </TableHeader>
  <TableBody>
    {
      purchases?.map(({_id, sellerId, itemId, status})=> (
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
          <Image src={sellerId?.authImgUrl} alt="Image" width={50} height={50} className="rounded-md object-cover" />
        </AspectRatio>
        <div>
        <h1>{sellerId?.authName}</h1>
        <p>{sellerId?.email}</p>
        </div>
        </div>
        
          </TableCell>
        <TableCell className="">{status}</TableCell>
    
  
      </TableRow>
  
      ))
    }
   
  </TableBody>
</Table>

        </div>
    );
};

export default ManageTrackPurchase;