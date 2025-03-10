/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { getCurrentUser, logout, verifyUserFromDB } from "@/services/authService";
import { IUser } from "@/types/item";


import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  products: any[]; 
  setProducts: Dispatch<SetStateAction<any[]>>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

  

  useEffect(() => {
    const handleUser = async () => {
      const user = await getCurrentUser();
      if(user){

        const verifyUser = await verifyUserFromDB(user?.email)
        
        if(verifyUser?.data?.email==user?.email){
           setUser(verifyUser?.data);
          setIsLoading(false);
        }else{
          setUser(null);
          setIsLoading(false);
          logout()
        }  
      }
     
    };

    handleUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading, products, setProducts }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context == undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;
