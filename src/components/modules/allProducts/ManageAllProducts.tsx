"use client"

import React, { useEffect, useState } from 'react';
import Categories from './Categories';
import AllProducts from './AllProducts';
import { getAllItems } from '@/services/itemService';
import { useUser } from '@/context/UserContext';

const ManageAllProducts = () => {
    const{products, setProducts} = useUser();
    // const [products, setProducts] = useState([])
    
    
    useEffect(()=>{

        const getItemData = async()=>{
            const res = await getAllItems('','');
            setProducts(res?.data);
        }
       getItemData();
       
    },[setProducts])

    const handleCategories = async(category:string)=>{
        
        try {
            let cat;
            let con;
            if(category==="All") {
                con = '';
                cat='';
            }
            else{
                con = 'category';
                cat=category;
            }
            const res = await getAllItems(con,cat);
            setProducts(res?.data);
            console.log(res?.data)
        } catch (error) {
            console.log(error)
        }
            
        
    }
    return (
        <div className='flex lg:flex-row flex-col lg:justify-center lg:items-start gap-x-5'>
        <Categories handleCategories={handleCategories}></Categories>
        <AllProducts></AllProducts>
    </div>
    );
};

export default ManageAllProducts;