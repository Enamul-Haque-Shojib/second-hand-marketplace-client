/* eslint-disable @typescript-eslint/no-explicit-any */


"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addItem = async (itemData: FormData): Promise<any> => {
    
    try {
      const res = await fetch(`http://localhost:5000/api/listings/create-listing`, {
        method: "POST",
        body: JSON.stringify(itemData),
      
        headers: {
        //   Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
        },
        // cache: 'no-store'
      });
      revalidateTag("PRODUCT");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };



export const updateItem = async (itemData: FormData, id: string): Promise<any> => {
    
    try {
      const res = await fetch(`http://localhost:5000/api/listings/update-listing/${id}`, {
        method: "PATCH",
        body: JSON.stringify(itemData),
      
        headers: {
        //   Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
        },
        // cache: 'no-store',
      });
      revalidateTag("PRODUCT");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };

  export const getAllItems = async () => {

    try {
      const res = await fetch(
        `http://localhost:5000/api/listings`,
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

  const deleteItem = async(id: string) => {
    const res = await fetch(`http://localhost:5000/api/listings/delete-listing/${id}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            // cache: 'no-store'
            
        }
    );
    revalidateTag("PRODUCT");
    const itemData = res.json();
    return itemData;
};


export const getSingleProduct = async (productId: string) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/listings/one-listing/${productId}`,
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

export default deleteItem;
  