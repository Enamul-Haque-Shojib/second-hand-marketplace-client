/* eslint-disable @typescript-eslint/no-explicit-any */


"use server";
import { TItem } from "@/types/item";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addItem = async (itemData: TItem): Promise<any> => {
    
    try {
      const res = await fetch(`https://second-hand-marketplace-server.vercel.app/api/listings/create-listing`, {
        method: "POST",
        body: JSON.stringify(itemData),
      
        headers: {
          Authorization: (await cookies()).get("secondHandMarketplace_accessToken")!.value,
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



export const updateItem = async (itemData: TItem, id: string): Promise<any> => {
    
    try {
      const res = await fetch(`https://second-hand-marketplace-server.vercel.app/api/listings/update-listing/${id}`, {
        method: "PATCH",
        body: JSON.stringify(itemData),
      
        headers: {
          Authorization: (await cookies()).get("secondHandMarketplace_accessToken")!.value,
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

  export const getAllItems = async (condition: string, search:string) => {
    
    let url='';
    if(condition==='search'){
      url=`https://second-hand-marketplace-server.vercel.app/api/listings?searchTerm=${search}`
    }else if(condition === 'category'){
      url=`https://second-hand-marketplace-server.vercel.app/api/listings?category=${search}`
    }else{
      url=`https://second-hand-marketplace-server.vercel.app/api/listings`
    }

    try {
      const res = await fetch(
        url,
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
  export const getUserItems = async (id:string) => {
    
  

    try {
      const res = await fetch(
        `https://second-hand-marketplace-server.vercel.app/api/listings/user-listings/${id}`,
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
    const res = await fetch(`https://second-hand-marketplace-server.vercel.app/api/listings/delete-listing/${id}`,
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
      `https://second-hand-marketplace-server.vercel.app/api/listings/one-listing/${productId}`,
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
  