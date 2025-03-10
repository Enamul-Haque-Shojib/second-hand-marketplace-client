/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Edit, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TItem } from "@/types/item"; // Ensure this type exists
import deleteItem, { getUserItems } from "@/services/itemService";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

const ManageItems = () => {
  const {user} = useUser();
  const router = useRouter();
  const [items, setItems] = useState<TItem[]>([]); // Explicitly define state type

  

  useEffect(() => {
    if (!user?._id) return; 
    const fetchAllItems = async () => {
      const res = await getUserItems(user?._id);
      setItems(res?.data);
    };
    fetchAllItems();
  }, [user?._id]);

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    toast.success('Product deleted successfully')
    } catch (error:any) {
      toast.error(error.message)
    }
    
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>All Items</h1>
        <Button onClick={() => router.push("/dashboard/listing/add-item")} size="sm">
          Add Product <Plus />
        </Button>
      </div>
      <Table>
        <TableCaption>A list of Items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">
                <AspectRatio ratio={16 / 9}>
                  <Image src={item.image} alt="Image" width={50} height={50} className="rounded-md object-cover" />
                </AspectRatio>
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.condition}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="text-right flex gap-2">
                <button onClick={() => router.push(`/dashboard/listing/update-item/${item._id}`)}>
                  <Edit className="w-5 h-5" />
                </button>
                <button onClick={() => item._id && handleDelete(item._id)}>
  <Trash className="w-5 h-5" />
</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageItems;
