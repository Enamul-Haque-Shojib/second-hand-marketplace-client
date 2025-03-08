import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
const Category = ({category}) => {
  
    return (
        <div className="w-[300px] border rounded-lg cursor-pointer" >
        <AspectRatio ratio={16 / 9} className="bg-muted ">
            <Image
                src={category.image}
                alt="item"
                fill
                
                className="h-full w-full rounded-md object-cover"
            />
        </AspectRatio>
        <CardHeader>
          <CardTitle className='my-3 text-center text-xl'>{category?.title}</CardTitle>
        </CardHeader>
      </div>
    );
};

export default Category;