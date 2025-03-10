


"use client";

import React from "react";
import Category from "./Category";
import { CategoriesFilter } from "@/constant";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CategoriesProps {
  handleHomeCategories: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ handleHomeCategories }) => {
  return (
    <div className="container mx-auto my-12 px-4 lg:px-0">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        Categories
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {CategoriesFilter.map((category, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleHomeCategories(category.title)}
          >
            <Category category={category} />
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button onClick={() => handleHomeCategories("All")} size="lg" variant="default">
          View All
        </Button>
      </div>
    </div>
  );
};

export default Categories;
