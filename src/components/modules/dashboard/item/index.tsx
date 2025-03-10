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
  const { user } = useUser();
  const router = useRouter();
  const [items, setItems] = useState<TItem[]>([]);

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
      toast.success("Product deleted successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Items</h1>
        <Button
          onClick={() => router.push("/dashboard/listing/add-item")}
          size="sm"
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </Button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <Table>
          <TableCaption>A list of your items.</TableCaption>
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
                <TableCell>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={item.image}
                      alt="Image"
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.condition}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="text-right flex gap-2 items-center justify-end">
                  <button
                    onClick={() => router.push(`/dashboard/listing/update-item/${item._id}`)}
                    className="text-indigo-600 hover:text-indigo-800 p-2 rounded-md"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => item._id && handleDelete(item._id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-md"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageItems;

