"use client"

import React from 'react';
import Banner from './banner/Banner';
import Features from './features/Features';
import Feedback from './feedback/Feedback';
import { getAllItems } from '@/services/itemService';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Categories from './categories/Categories';

const ManageHomePage = () => {


    const {setProducts} = useUser();
    const router = useRouter();
    const handleHomeCategories=async(category: string)=>{
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
                    router.push('/all-products');
                } catch (error) {
                    console.log(error)
                }
    }
    return (
        <div>
            <Banner></Banner>
            <Categories handleHomeCategories={handleHomeCategories}></Categories>
            <Features></Features>
            <Feedback></Feedback>
        </div>
    );
};

export default ManageHomePage;