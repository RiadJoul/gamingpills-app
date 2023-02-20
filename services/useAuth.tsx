import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthenticatedUserQuery } from "../generated/graphql";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const [result] = useAuthenticatedUserQuery();

  const { data } = result;

  useEffect(() => {
    if (data) setUser(data.AuthenticatedUser);

  }, [result]);


  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}