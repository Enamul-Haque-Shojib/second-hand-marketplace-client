/* eslint-disable @typescript-eslint/no-explicit-any */

// export interface IUser {
    
//     name: string;
//     email: string;
//     hasShop?: boolean;
//     status?: "Ban" | "Unban";
//     role: "user" | "admin";
//     iat?: number;
//     exp?: number;
//   }
export interface IUser {
    _id: string;
    authName: string;
    authImgUrl: string;
    email: string;
    status?: "Ban" | "Unban";
    role: "user" | "admin";
    
  }
  
export interface ITransaction {
  _id?: string;
  buyerId: any;
  sellerId: any;
  itemId: any;
  status?: string;
}



export type TItem={
    _id?: string;
    title: string,
            image:string,
            description: string,
            userId:any,
            status?: string,
            condition: string,
            price: number,
            category: string,
            
}