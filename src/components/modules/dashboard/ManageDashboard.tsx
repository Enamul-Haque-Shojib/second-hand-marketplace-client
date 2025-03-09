"use client"

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import Chart from "react-apexcharts";
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
const ManageProfile = () => {
    const {user} = useUser();




    const pieChartOptions = {
        labels: ["Products", "Purchases", "Sales"],
      };
      const pieChartSeries = [35, 54, 35];
    
    return (
        <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
   
        
        <Card className="col-span-1 flex items-center p-4">
          <Avatar className="w-16 h-16">
            <Image src={user?.authImgUrl || ''} alt="User" width={80} height={80} />
          </Avatar>
          <div className="ml-4">
            <h2 className="text-lg font-bold">Welcome, {user?.authName}!</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
        </Card>
        
   
        <Card className="col-span-1">
          <CardContent>
            <Chart options={pieChartOptions} series={pieChartSeries} type="pie" height={250} />
          </CardContent>
        </Card>

     
         <Card className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-around p-4">
          <div className="text-center">
            <h4 className="text-xl font-bold">52</h4>  
            <p className="text-gray-500">Products</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold">41</h4>
            <p className="text-gray-500">Purchases</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold">25</h4>
            <p className="text-gray-500">Sales</p>
          </div>
        </Card>
  
       
  
       
      </div>
    );
};

export default ManageProfile;