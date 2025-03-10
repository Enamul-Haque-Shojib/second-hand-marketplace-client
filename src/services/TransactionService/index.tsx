
"use server"
import { ITransaction } from "@/types/item";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const addTransaction = async (transactionData: ITransaction): Promise<any> => {
    
    try {
      const res = await fetch(`https://second-hand-marketplace-server.vercel.app/api/transactions/create-transaction`, 

        {
        method: "POST",
        body: JSON.stringify(transactionData),
      
        headers: {
          Authorization: (await cookies()).get("secondHandMarketplace_accessToken")!.value,
        "Content-Type": "application/json",
        },
        // cache: 'no-store'
      });
      revalidateTag("TRANSACTION");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };



export const updateTransaction = async (id: string): Promise<any> => {
    
    try {
      const res = await fetch(`https://second-hand-marketplace-server.vercel.app/api/transactions/update-transaction/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("secondHandMarketplace_accessToken")!.value,
        "Content-Type": "application/json",
        },
        // cache: 'no-store',
      });
      revalidateTag("TRANSACTION");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };


  export const getAllPurchases = async (userId: string) => {

    try {
      const res = await fetch(
        `https://second-hand-marketplace-server.vercel.app/api/transactions/purchase/${userId}`,
        {
          next: {
            tags: ["TRANSACTION"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };

  export const getAllSales = async (userId: string) => {

    try {
      const res = await fetch(
        `https://second-hand-marketplace-server.vercel.app/api/transactions/sales/${userId}`,
        {
          next: {
            tags: ["TRANSACTION"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };

