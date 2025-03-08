import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const Features = () => {
  return (
    <div className="lg:w-[85%] w-[95%] mx-auto my-12">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
        Our Features
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <Card className="group w-full h-full transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden">
          <CardHeader className="p-6">
            <div className="flex items-center mb-6">
              <Image
                className="w-16 h-16 mr-4"
                src="https://secondbd.com/wp-content/uploads/2022/05/default_services_1.png"
                alt="Parcel Safety Icon"
                width={100}
                height={100}
              />
              <CardTitle className="text-2xl font-semibold text-blue-800">
              Click ‘Add Product’ add description and photo
              </CardTitle>
            </div>
            <CardDescription className="text-gray-700 leading-relaxed">
            Write product details and take good pics of the product you are selling
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Feature 2 */}
        <Card className="group w-full h-full transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-br from-green-50 to-green-100 rounded-xl overflow-hidden">
          <CardHeader className="p-6">
            <div className="flex items-center mb-6">
              <Image
                className="w-16 h-16 mr-4"
                src="https://secondbd.com/wp-content/uploads/2022/05/contact_address-1.png"
                alt="Fast Delivery Icon"
                width={100}
                height={100}
              />
              <CardTitle className="text-2xl font-semibold text-green-800">
              Share your ad in the marketplace
              </CardTitle>
            </div>
            <CardDescription className="text-gray-700 leading-relaxed">
            Sell your product fast and easily with the right detail, price, picture and location.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Feature 3 */}
        <Card className="group w-full h-full transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl overflow-hidden">
          <CardHeader className="p-6">
            <div className="flex items-center mb-6">
              <Image
                className="w-16 h-16 mr-4"
                src="https://secondbd.com/wp-content/uploads/2022/05/default_services_3.png"
                alt="Live Tracking Icon"
                width={100}
                height={100}
              />
              <CardTitle className="text-2xl font-semibold text-yellow-800">
              Buyers contact you directly
              </CardTitle>
            </div>
            <CardDescription className="text-gray-700 leading-relaxed">
            You can go to the buyer or he/she can come to you directly.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Features;
