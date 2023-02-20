import { useAuthenticatedUserQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useIsAuth = () => {
  const [result] = useAuthenticatedUserQuery();
  const { data ,fetching} = result;

  const router = useRouter();
  
  useEffect(() => {
    if (!fetching) {
      if(data && !data.AuthenticatedUser)
        router.push("/auth/login");
        localStorage.removeItem("id")
      if(data && data.AuthenticatedUser) {
        localStorage.setItem("id",data.AuthenticatedUser.id)
      }
    }

  }, [fetching,data,router]);
};