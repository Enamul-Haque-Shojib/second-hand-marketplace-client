/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`https://second-hand-marketplace-server.vercel.app/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("secondHandMarketplace_accessToken", result.data.accessToken);
      (await cookies()).set("secondHandMarketplace_refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const updateUser = async (userData: FieldValues, id: string) => {
  try {
    const res = await fetch(`https://second-hand-marketplace-server.vercel.app/api/auth/update-auth/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();


    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`https://second-hand-marketplace-server.vercel.app/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result?.success) {
      (await cookies()).set("secondHandMarketplace_accessToken", result?.data?.accessToken);
      (await cookies()).set("secondHandMarketplace_refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const verifyUserFromDB = async (email:string) => {

  try {
    const res = await fetch(
      `https://second-hand-marketplace-server.vercel.app/api/auth/one-auth/${email}`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};


export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("secondHandMarketplace_accessToken")?.value;
  
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};




export const logout = async () => {
  (await cookies()).delete("secondHandMarketplace_accessToken");
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `https://second-hand-marketplace-server.vercel.app/api/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("secondHandMarketplace_refreshToken")!.value,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllFeedbacks = async () => {

  try {
    const res = await fetch(
      `https://second-hand-marketplace-server.vercel.app/api/auth/feedback`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};


export const getStatistics = async (userId: string) => {
  try {
    const res = await fetch(
      `https://second-hand-marketplace-server.vercel.app/api/auth/dashboard-auth/${userId}`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
