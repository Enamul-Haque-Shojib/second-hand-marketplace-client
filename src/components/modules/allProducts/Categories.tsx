import { CategoriesFilter } from '@/constant';
import React from 'react';

interface CategoriesProps {
    handleCategories: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ handleCategories }) => {
    return (
        <div className='bg-gray-100 p-5 rounded-lg lg:w-[20%] w-full sticky top-20'>
            <div className='border' onClick={() => handleCategories('All')}>
                All
            </div>
            {CategoriesFilter.map((category, index) => (
                <div 
                    className='border' 
                    key={index} 
                    onClick={() => handleCategories(category.title)}
                >
                    {category.title}
                </div>
            ))}
        </div>
    );
};

export default Categories;
