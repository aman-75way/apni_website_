// import { ReactNode, createContext , useContext } from "react";

// // const [tokenValue , setTokenValue] = useState<string>("")


// export const AuthContext = createContext({});
// export const AuthProvider = (children : ReactNode) => {
//     const storeTokenInLocalStorage = (serverToken : string) => {
//         return localStorage.setItem("token" , serverToken);
//     };

//     return(
//         <AuthContext.Provider value={storeTokenInLocalStorage}>
//                 {children}
//         </AuthContext.Provider>
//     );
// };




















import { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from "react";
import axios from "axios";
// import jwt from "jsonwebtoken";

export type User = {
  token: string;
};

export type UserData = {
  userName : string,
  userNumber : string,
  userEmail : string,
  userGender : string
}

// const [userDetails , setUserDetails] = useState<string>("");
export interface UserContextInterface {
  user: User;
  userData : UserData;
  setUser: Dispatch<SetStateAction<User>>;
  setUserData: Dispatch<SetStateAction<UserData>>;
  storeTokenInLocalStorage: (serverToken: string) => void;
  removeTokenFromLocalStorage: () => void;
  userAuthentication: (serverToken: string) => void;
}

/* way - 1   */

// export const UserContext = createContext<Partial<UserContextInterface>>({})


/* way - 2   */

const defaultState = {
  user: {
    token: ""
  },
  userData : {
    userName : "",
    userNumber : "",
    userEmail : "",
    userGender : ""
  },
  setUser: (user: User) => {},
  setUserData: (userData : UserData) => {},
  storeTokenInLocalStorage: (serverToken: string) => {},
  removeTokenFromLocalStorage: () => {},
  userAuthentication: (serverToken: string) => {},
} as UserContextInterface;

export const UserContext = createContext(defaultState);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  
  const [user, setUser] = useState<User>({
    token: "",
  });

  const [userData , setUserData] = useState<UserData>({
    userName : "",
    userNumber : "",
    userEmail : "",
    userGender : ""
  })

  const storeTokenInLocalStorage = (serverToken: string) => {
    localStorage.setItem("token", serverToken);
    setUser({token : serverToken });
};

  const removeTokenFromLocalStorage = () => {
     setUser({token : ""})
    return localStorage.removeItem("token");
  };


  const userAuthentication = async (serverToken : string)=> {
      try {
        console.log("Jo user ka token hai n  " ,  serverToken);
        const response = await axios.get('http://localhost:4000/userDetails' , {
          headers : {
            Authorization : `Bearer ${serverToken}`,
          },
        });
        if(response.status === 200){
          console.log("auth.tsx me response :::: " , response);
          const userDetails_ = await response.data;

          // console.log(userDetails_);
          setUserData({
            userName : userDetails_.userData.name.toString(),
            userNumber : userDetails_.userData.mobile,
            userEmail : userDetails_.userData.email,
            userGender : userDetails_.userData.gender 
          });
          // console.log("Name is : " , userDetails_.userData.name);
        }
        
      } catch (error) {
        console.log("Error : " , error);
      }
  }


  return (
    <UserContext.Provider
      value={{ user, setUser, userData , setUserData , storeTokenInLocalStorage, removeTokenFromLocalStorage , userAuthentication }}
    >
      {children}
    </UserContext.Provider>
  );
}
