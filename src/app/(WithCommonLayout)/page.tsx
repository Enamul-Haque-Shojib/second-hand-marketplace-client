import Banner from '@/components/modules/Home/banner/Banner';
import Categories from '@/components/modules/Home/categories/Categories';
import Features from '@/components/modules/Home/features/Features';
import Feedback from '@/components/modules/Home/feedback/Feedback';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <Features></Features>
            <Feedback></Feedback>
        </div>
    );
};

export default HomePage;