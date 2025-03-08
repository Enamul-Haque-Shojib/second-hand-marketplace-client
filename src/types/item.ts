
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
  




export type TItem={
    _id?: string;
    title: string,
            image:string,
            description: string,
            userId:string,
            status: string,
            condition: string,
            price: number,
            category: string,
}