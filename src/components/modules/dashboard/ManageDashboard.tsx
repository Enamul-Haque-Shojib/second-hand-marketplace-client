// "use client";

// import React, { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar } from "@/components/ui/avatar";
// // import Chart from "react-apexcharts";
// import dynamic from "next/dynamic";

// // Import Chart dynamically with SSR disabled
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// import Image from "next/image";
// import { useUser } from "@/context/UserContext";
// import { getStatistics } from "@/services/authService";


// interface IStatistics {
//   productCount: number;
//   buyCount: number;
//   saleCount: number;
// }

// const ManageDashboard = () => {
//   const { user, isLoading, setIsLoading } = useUser();

//   // // Initialize state with default values
//   const [statistics, setStatistics] = useState<IStatistics>({
//     productCount: 0,
//     buyCount: 0,
//     saleCount: 0,
//   });

//   useEffect(() => {
//     if (!user?._id) return; // Ensure _id exists before making the API call

//     const getPurchaseData = async () => {
//       try {
//         const statisticsData = await getStatistics(user._id);
//         setStatistics(statisticsData?.data);
//         setIsLoading(false)
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getPurchaseData();
//   }, [user?._id]);

//   const pieChartOptions = {
//     labels: ["Products", "Purchases", "Sales"],
//   };
//   const pieChartSeries = [
//     statistics.productCount,
//     statistics.buyCount,
//     statistics.saleCount,
//   ];

//   if (isLoading) {
//     return <p>Loading.....</p>;
//   }

//   return (
//     <div>
//        <div className="flex">
//         <Card className="col-span-1 flex items-center p-4">
//           <Avatar className="w-16 h-16">
//             {user?.authImgUrl && (
//               <Image
//                 src={user.authImgUrl}
//                 alt="user"
//                 width={80}
//                 height={80}
//                 className="h-full w-full rounded-md object-cover"
//               />
//             )}
//           </Avatar>

//           <div className="ml-4">
//             <h2 className="text-lg font-bold">Welcome, {user?.authName}!</h2>
//             <p className="text-sm text-gray-500">{user?.email}</p>
//             <p className="text-sm text-gray-500">{user?.role}</p>
//           </div>
//         </Card>

//         <Card className="col-span-1">
//           <CardContent>
//             <Chart
//               options={pieChartOptions}
//               series={pieChartSeries}
//               type="pie"
//               height={250}
//             />
//           </CardContent>
//         </Card>
//       </div>

//       <div className="flex">
//         <Card className="text-center">
//           <h4 className="text-xl font-bold">{statistics.productCount}</h4>
//           <p className="text-gray-500">Products</p>
//         </Card>
//         <Card className="text-center">
//           <h4 className="text-xl font-bold">{statistics.buyCount}</h4>
//           <p className="text-gray-500">Purchases</p>
//         </Card>
//         <Card className="text-center">
//           <h4 className="text-xl font-bold">{statistics.saleCount}</h4>
//           <p className="text-gray-500">Sales</p>
//         </Card>
//       </div> 
      
//     </div>
//   );
// };

// export default ManageDashboard;


"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { getStatistics } from "@/services/authService";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IStatistics {
  productCount: number;
  buyCount: number;
  saleCount: number;
}

const ManageDashboard = () => {
  const { user, isLoading, setIsLoading } = useUser();
  const [statistics, setStatistics] = useState<IStatistics>({
    productCount: 0,
    buyCount: 0,
    saleCount: 0,
  });

  useEffect(() => {
    if (!user?._id) return;
    const getPurchaseData = async () => {
      try {
        const statisticsData = await getStatistics(user._id);
        setStatistics(statisticsData?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPurchaseData();
  }, [user?._id, setIsLoading]);

  const pieChartOptions = {
    labels: ["Products", "Purchases", "Sales"],
  };
  const pieChartSeries = [
    statistics.productCount,
    statistics.buyCount,
    statistics.saleCount,
  ];

  if (isLoading) {
    return <p className="text-center text-gray-600 text-lg">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:space-x-6">
        <Card className="flex flex-col justify-center items-center p-6 shadow-lg bg-white rounded-lg w-full sm:w-1/2 lg:w-[40%]">
          <Avatar className="w-50 h-50">
            {user?.authImgUrl && (
              <Image
                src={user.authImgUrl}
                alt="user"
                width={500}
                height={500}
                className="h-full w-full rounded-full object-cover"
              />
            )}
          </Avatar>
          <div className="ml-6 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.authName}!</h2>
            <p className="text-gray-500">{user?.email}</p>
            <p className="text-gray-500 font-medium capitalize">{user?.role}</p>
          </div>
        </Card>

        <Card className="shadow-lg bg-white rounded-lg p-6 w-full sm:w-1/2 lg:w-[60%]">
          <CardHeader className="text-center text-xl font-semibold text-gray-800">Statistics Overview</CardHeader>
          <CardContent>
            <Chart
              options={pieChartOptions}
              series={pieChartSeries}
              type="pie"
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card className="text-center p-6 shadow-md bg-white rounded-lg">
          <h4 className="text-2xl font-bold text-gray-800">{statistics.productCount}</h4>
          <p className="text-gray-500">Products</p>
        </Card>
        <Card className="text-center p-6 shadow-md bg-white rounded-lg">
          <h4 className="text-2xl font-bold text-gray-800">{statistics.buyCount}</h4>
          <p className="text-gray-500">Purchases</p>
        </Card>
        <Card className="text-center p-6 shadow-md bg-white rounded-lg">
          <h4 className="text-2xl font-bold text-gray-800">{statistics.saleCount}</h4>
          <p className="text-gray-500">Sales</p>
        </Card>
      </div>
    </div>
  );
};

export default ManageDashboard;


