

"use client";

import { useUser } from "@/context/UserContext";
import { getAllPurchases } from "@/services/TransactionService";
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

interface IPurchase {
  _id: string;
  sellerId: {
    _id: string;
    authImgUrl: string;
    authName: string;
    email: string;
  };
  itemId: {
    _id: string;
    image: string;
    title: string;
    price: number;
  };
  status: string;
}

const ManageTrackPurchase = () => {
  const { user } = useUser();
  const [purchases, setPurchases] = useState<IPurchase[]>([]); // 🔹 Fix: Define Type

  useEffect(() => {
    if (!user?._id) return;

    const getPurchaseData = async () => {
      try {
        const purchaseData = await getAllPurchases(user?._id);
        setPurchases(purchaseData?.data || []); // Ensure it doesn't set `undefined`
      } catch (error) {
        console.log(error);
      }
    };

    getPurchaseData();
  }, [user?._id]);

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Track Your Purchases</h1>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <Table>
          <TableCaption>A list of your purchases.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases?.map(({ _id, sellerId, itemId, status }) => (
              <TableRow key={_id}>
                <TableCell>
                  <div className="flex items-center justify-start gap-3">
                    
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

                <TableCell className="text-gray-600">{itemId?.price} USD</TableCell>
                <TableCell>
                  <div className="flex items-center justify-start gap-3">
                   
                      {sellerId?.authImgUrl && (
                        <Image
                          src={sellerId.authImgUrl}
                          alt="Seller Image"
                          width={50}
                          height={50}
                          className="rounded-full object-cover"
                        />
                      )}
                  
                    <div>
                      <h2 className="font-semibold text-gray-700">{sellerId?.authName}</h2>
                      <p className="text-sm text-gray-500">{sellerId?.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-md text-sm ${
                      status === "Complete"
                        ? "bg-green-100 text-green-600"
                        : status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageTrackPurchase;

