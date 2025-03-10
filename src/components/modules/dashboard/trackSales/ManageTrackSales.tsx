


"use client";

import { useUser } from "@/context/UserContext";
import { getAllSales, updateTransaction } from "@/services/TransactionService";
import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  const { user } = useUser();
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    if (!user?._id) return;

    const getSalesData = async () => {
      try {
        const salesData = await getAllSales(user?._id);
        setSales(salesData?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    getSalesData();
  }, [user?._id]);

  const handleComplete = async (id: string) => {
    try {
      const res = await updateTransaction(id);

      if (res?.success) {
        setSales((prevSales) =>
          prevSales.map((sale) =>
            sale._id === id ? { ...sale, status: "Completed" } : sale
          )
        );
        toast.success("Transaction completed successfully");
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Manage Track Sales</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <Table>
          <TableCaption>List of items sold.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales?.map(({ _id, buyerId, itemId, status }) => (
              <TableRow key={_id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    
                      {itemId?.image && (
                        <Image
                          src={itemId.image}
                          alt="Product Image"
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                      )}
                   
                    <span className="font-medium text-gray-800">{itemId?.title}</span>
                  </div>
                </TableCell>

                <TableCell className="text-gray-600">${itemId?.price}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
              
                      {buyerId?.authImgUrl && (
                        <Image
                          src={buyerId.authImgUrl}
                          alt="Buyer Image"
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      )}
             
                    <div>
                      <h2 className="font-semibold text-gray-700">{buyerId?.authName}</h2>
                      <p className="text-sm text-gray-500">{buyerId?.email}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={`px-3 py-1 rounded-md ${
                      status === "Complete"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                     
                    }`}
                  >
                    {status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                 
                    <Button
                    disabled={status === "Complete"}
                      variant="outline"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => handleComplete(_id)}
                    >
                      Complete
                    </Button>
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageTrackSales;
