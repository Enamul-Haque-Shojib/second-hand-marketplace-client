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
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
    <div>
      <h1>Manage Track Purchase</h1>
      <Table>
        <TableCaption>A list of items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases?.map(({ _id, sellerId, itemId, status }) => (
            <TableRow key={_id}>
              <TableCell className="font-medium">
                <div className="flex">
                  <AspectRatio ratio={16 / 9}>
                    {itemId?.image && (
                      <Image
                        src={itemId.image}
                        alt="Product Image"
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    )}
                  </AspectRatio>
                  <h1>{itemId?.title}</h1>
                </div>
              </TableCell>

              <TableCell>{itemId?.price}</TableCell>
              <TableCell className="">
                <div className="flex">
                  <AspectRatio ratio={16 / 9}>
                    {sellerId?.authImgUrl && (
                      <Image
                        src={sellerId.authImgUrl}
                        alt="Seller Image"
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    )}
                  </AspectRatio>
                  <div>
                    <h1>{sellerId?.authName}</h1>
                    <p>{sellerId?.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="">{status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageTrackPurchase;
