"use client";


import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Edit, Eye, Plus, Trash } from "lucide-react";
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import deleteItem, { getAllItems } from '@/services/itemService';
import Image from "next/image"
 
import { AspectRatio } from "@/components/ui/aspect-ratio"


const ManageItems = () => {
    const router = useRouter();
    const [items,setItems] = useState([]);

    const fetchAllItems= async() => {
      const res = await getAllItems();
      
      setItems(res?.data);
    }
    useEffect(() =>{
      fetchAllItems()
    },[]);

    const handleDetails=(item)=>{
      console.log(item)
    }
    const handleDelete=async(id)=>{
      const res = await deleteItem(id);
      console.log(res)
    }
    return (
        <div>
            <div className='flex justify-between items-center'>
            <h1>All Items</h1>
            <Button
            onClick={() => router.push("/dashboard/listing/add-item")}
            size="sm"
          >
            Add Product <Plus />
          </Button>
            </div>
            <Table>
  <TableCaption>A list Items.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Image</TableHead>
      <TableHead>Title</TableHead>
      <TableHead>Condition</TableHead>
      <TableHead>Category</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Stock</TableHead>
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
      items.map((item)=> (
        <TableRow key={item._id}>
        <TableCell className="font-medium">
        <AspectRatio ratio={16 / 9}>
          <Image src={item?.image} alt="Image" width={50} height={50} className="rounded-md object-cover" />
        </AspectRatio>
          </TableCell>
        <TableCell>{item?.title}</TableCell>
        <TableCell>{item?.condition}</TableCell>
        <TableCell className="">{item?.category}</TableCell>
        <TableCell className="">{item?.price}</TableCell>
        <TableCell className="">{item?.status}</TableCell>
        <TableCell className="text-right">
          <button onClick={()=>{handleDetails(item)}}><Eye className="w-5 h-5" /></button>
          <button onClick={()=>router.push(`/dashboard/listing/update-item/${item?._id}`)}><Edit className="w-5 h-5" /></button>
          <button onClick={()=>{handleDelete(item?._id)}}><Trash className="w-5 h-5" /></button>
        </TableCell>
      </TableRow>
  
      ))
    }
   
  </TableBody>
</Table>

            
        </div>
    );
};

export default ManageItems;