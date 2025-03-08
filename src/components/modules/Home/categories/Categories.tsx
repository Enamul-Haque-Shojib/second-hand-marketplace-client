"use client"
import React from 'react';
import Category from './Category';
import { CategoriesFilter } from '@/constant';

const Categories = () => {
    const handleCategories=()=>{
        console.log('Categories')
    }
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
            onClick={handleCategories}
            ><Category category={category} ></Category></div>))
        }
      
      {/* <div onClick={handleCategories}><Category ></Category></div> */}
    
     
     
      
      </div>
      
            
        </div>
    );
};

export default Categories;