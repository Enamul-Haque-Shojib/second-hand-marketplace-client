/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`http://localhost:5000/api/auth/register`, {
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

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`http://localhost:5000/api/auth/login`, {
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
      `http://localhost:5000/api/auth/one-auth/${email}`);
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
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
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
      `http://localhost:5000/api/auth/feedback`,
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
