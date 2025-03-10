


import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CategoryProps {
  category: {
    title: string;
    image: string;
  };
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </AspectRatio>
      <CardHeader className="text-center py-4">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {category.title}
        </CardTitle>
      </CardHeader>
    </div>
  );
};

export default Category;
