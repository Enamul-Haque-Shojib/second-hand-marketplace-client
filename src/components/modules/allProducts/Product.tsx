import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import Image from "next/image"
 
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {  UserRound } from 'lucide-react';
import Link from 'next/link';

const Product = ({product}) => {
    const {_id,title, condition, userId, category,price, image} = product;
    
    return (
        <Card className="w-[350px]">
        <CardHeader>
        <AspectRatio ratio={16 / 9} className="bg-muted">
        <Image
            src={image}
            alt="item"
            fill
            
            className="h-full w-full rounded-md object-cover"
        />
        </AspectRatio>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
        <p>Category: {category}</p>
        <p>Condition: {condition}</p>
        <p>Price: {price}</p>
        <Avatar>
      <AvatarImage src={userId?.authImgUrl} alt='user' />
      <AvatarFallback><UserRound></UserRound></AvatarFallback>
    </Avatar>
        </CardContent>
        <CardFooter className="flex justify-end">
            <Link href={`/all-products/${_id}`}>
            <Button variant="outline">Details</Button>
            </Link>
          
        </CardFooter>
      </Card>
    );
};

export default Product;