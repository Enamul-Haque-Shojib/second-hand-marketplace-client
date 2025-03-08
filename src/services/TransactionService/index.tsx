
"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from "next/cache";


export const addTransaction = async (transactionData: FormData): Promise<any> => {
    
    try {
      const res = await fetch(`http://localhost:5000/api/transactions/create-transaction`, {
        method: "POST",
        body: JSON.stringify(transactionData),
      
        headers: {
        //   Authorization: (await cookies()).get("accessToken")!.value,
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
      const res = await fetch(`http://localhost:5000/api/transactions/update-transaction/${id}`, {
        method: "PATCH",
        headers: {
        //   Authorization: (await cookies()).get("accessToken")!.value,
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
        `http://localhost:5000/api/transactions/purchase/${userId}`,
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
        `http://localhost:5000/api/transactions/sales/${userId}`,
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

