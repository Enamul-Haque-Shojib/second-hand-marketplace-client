


"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { TItem } from "@/types/item";

interface ProductProps {
  product: TItem;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { _id, title, condition, userId, category, price, image } = product;

  return (
    <Card className="w-full lg:w-[320px] sm:w-[350px] bg-white shadow-md rounded-lg overflow-hidden">
      <CardHeader className="p-4">
        <AspectRatio ratio={16 / 9} className="bg-gray-100 rounded-md">
          <Image
            src={image}
            alt="item"
            fill
            className="h-full w-full object-cover rounded-md"
          />
        </AspectRatio>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className=" text-gray-600 text-sm ">
        <p><span className="font-semibold">Category:</span> {category}</p>
        <p><span className="font-semibold">Condition:</span> {condition}</p>
        <p><span className="font-semibold">Price:</span> ${price}</p>
        
      </CardContent>
      <CardFooter className="flex justify-end">
        <div className="flex justify-between items-center w-full">
        <div className="flex items-center justify-center gap-3">
          <Avatar>
            <AvatarImage src={userId?.authImgUrl} alt="user" />
            <AvatarFallback>
              <UserRound className="text-gray-500" />
            </AvatarFallback>
          </Avatar>
          <span className="text-gray-700">Seller</span>
        </div>
        <Link href={`/all-products/${_id}`}>
          <Button variant="outline" className="w-full sm:w-auto">
            View Details
          </Button>
        </Link>
        </div>
      
        
      </CardFooter>
    </Card>
  );
};

export default Product;

