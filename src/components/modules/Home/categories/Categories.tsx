"use client"
import React from 'react';
import Category from './Category';
import { CategoriesFilter } from '@/constant';
import { Button } from '@/components/ui/button';


const Categories = ({handleHomeCategories}) => {
  
    return (
        <div className="lg:w-[90%] w-[95%] mx-auto my-12">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
        Categories
      </h1>
      <div className='grid grid-cols-4 gap-5'>
        {
            CategoriesFilter.map((category, index)=>(
            <div 
            key={index} 
            onClick={()=>{handleHomeCategories(category.title)}}
            ><Category category={category} ></Category></div>))
        }
    
      </div>
      
            <Button onClick={()=>{handleHomeCategories('All')}}>View All</Button>
        </div>
    );
};

export default Categories;