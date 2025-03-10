"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";

// Import Chart dynamically with SSR disabled
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { getStatistics } from "@/services/authService";


interface IStatistics {
  productCount: number;
  buyCount: number;
  saleCount: number;
}

const ManageDashboard = () => {
  const { user, isLoading } = useUser();

  // // Initialize state with default values
  const [statistics, setStatistics] = useState<IStatistics>({
    productCount: 0,
    buyCount: 0,
    saleCount: 0,
  });

  useEffect(() => {
    if (!user?._id) return; // Ensure _id exists before making the API call

    const getPurchaseData = async () => {
      try {
        const statisticsData = await getStatistics(user._id);
        setStatistics(statisticsData?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPurchaseData();
  }, [user?._id]);

  const pieChartOptions = {
    labels: ["Products", "Purchases", "Sales"],
  };
  const pieChartSeries = [
    statistics.productCount,
    statistics.buyCount,
    statistics.saleCount,
  ];

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  return (
    <div>
       <div className="flex">
        <Card className="col-span-1 flex items-center p-4">
          <Avatar className="w-16 h-16">
            {user?.authImgUrl && (
              <Image
                src={user.authImgUrl}
                alt="user"
                width={80}
                height={80}
                className="h-full w-full rounded-md object-cover"
              />
            )}
          </Avatar>

          <div className="ml-4">
            <h2 className="text-lg font-bold">Welcome, {user?.authName}!</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
        </Card>

        <Card className="col-span-1">
          <CardContent>
            <Chart
              options={pieChartOptions}
              series={pieChartSeries}
              type="pie"
              height={250}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex">
        <Card className="text-center">
          <h4 className="text-xl font-bold">{statistics.productCount}</h4>
          <p className="text-gray-500">Products</p>
        </Card>
        <Card className="text-center">
          <h4 className="text-xl font-bold">{statistics.buyCount}</h4>
          <p className="text-gray-500">Purchases</p>
        </Card>
        <Card className="text-center">
          <h4 className="text-xl font-bold">{statistics.saleCount}</h4>
          <p className="text-gray-500">Sales</p>
        </Card>
      </div> 
      
    </div>
  );
};

export default ManageDashboard;
