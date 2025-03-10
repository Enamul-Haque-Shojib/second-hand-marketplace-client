
"use client";

import React from "react";
import Banner from "./banner/Banner";
import Features from "./features/Features";
import Feedback from "./feedback/Feedback";
import { getAllItems } from "@/services/itemService";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Categories from "./categories/Categories";

const ManageHomePage = () => {
  const { setProducts } = useUser();
  const router = useRouter();

  const handleHomeCategories = async (category: string) => {
    try {
      let cat = "";
      let con = "";

      if (category !== "All") {
        con = "category";
        cat = category;
      }

      const res = await getAllItems(con, cat);
      setProducts(res?.data);
      router.push("/all-products");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <Banner />
      <Categories handleHomeCategories={handleHomeCategories} />
      <Features />
      <Feedback />
    </div>
  );
};

export default ManageHomePage;
