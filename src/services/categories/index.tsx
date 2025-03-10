/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create category
export const createCategory = async (data: FormData) => {
  try {
    const res = await fetch(`https://second-hand-marketplace-server.vercel.app/api/category`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("secondHandMarketplace_accessToken")!.value,
      },
      body: data,
    });

    revalidateTag("CATEGORY");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all categories
export const getAllCategories = async () => {
  try {
    const res = await fetch(`https://second-hand-marketplace-server.vercel.app/api/category`, {
      next: {
        tags: ["CATEGORY"],
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete category
export const deleteCategory = async (categoryId: string): Promise<any> => {
  try {
    const res = await fetch(
      `https://second-hand-marketplace-server.vercel.app/api/category/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("secondHandMarketplace_accessToken")!.value,
        },
      }
    );
    revalidateTag("CATEGORY");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
