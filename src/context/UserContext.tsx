
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
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  console.log(user);
  const [isLoading, setIsLoading] = useState(true);

  

  useEffect(() => {
    const handleUser = async () => {
      const user = await getCurrentUser();
      if(user){

        const verifyUser = await verifyUserFromDB(user?.email)
        // console.log(verifyUser?.data?.email, user?.email)
        if(verifyUser?.data?.email==user?.email){
           setUser(verifyUser?.data);
          setIsLoading(false);
        }else{
          setUser(null);
          setIsLoading(false);
          logout()
        }  
      }
      // setUser(user);
      // setIsLoading(false);
    };

    handleUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
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
