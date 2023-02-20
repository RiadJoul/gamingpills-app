import React, { useState } from "react";
import Link from "next/link";
import { Role, User } from "../../generated/graphql";
import { PlayerNavigationItems,AdminNavigationItems } from "./NavigationItems";
import { IoExitOutline } from "react-icons/io5";
import ChallengeModal from "../Challenge/ChallengeModal";
import { FiPlusSquare } from "react-icons/fi";
import { useRouter } from "next/router";
import { useLogoutMutation } from "../../generated/graphql";
import useAuth from "../../services/useAuth";

const SideNavigation = () => {
  //@ts-ignore
  const {user}:User = useAuth();
  
  const [showModal, setShowModal] = useState(false);

  const [,logout] = useLogoutMutation();

  const router = useRouter();
  const [loading,setLoading] = useState<boolean>(false);

  const signOut = async () => {
    setLoading(true)
    const response = await logout();
      if (response.data?.logout) {
        setTimeout(() => router.push("/auth/login"), 1000);
      }
  }
  return user && (
    <>
      <ChallengeModal show={showModal} close={() => setShowModal(false)} />

     
        <ul className="space-y-3 bg-dark rounded-md sticky top-24 px-2 py-2">
          {
            user.role == Role.Player &&
          <li
            className="hover:bg-black text-center cursor-pointer py-2 px-4 rounded-md transition duration-400"
            onClick={() => setShowModal(true)}
          >
            <span className="flex items-center justify-center text-xl text-primary">
              <FiPlusSquare />
            </span>
            <span className="font-semibold text-base text-white">Challenge</span>
          </li>

          }
          
          {
          user.role == Role.Player &&
          PlayerNavigationItems.map(
            (item) =>
              item.side && (
                <Link href={item.href} key={item.href}>
                  <li className="hover:bg-black text-center cursor-pointer py-2 px-4 rounded-md transition duration-400">
                    <span className="flex items-center justify-center text-xl text-primary">
                      <item.icon></item.icon>
                    </span>
                    <span className="font-semibold text-base text-white">
                      {item.title}
                    </span>
                  </li>
                </Link>
              )
          )
        }
        {
          user.role == Role.Admin && 
          AdminNavigationItems.map(
            (item) =>
            item.side && (
              <Link href={item.href} key={item.href}>
                  <li className="hover:bg-black text-center cursor-pointer py-2 px-4 rounded-md transition duration-400">
                    <span className="flex items-center justify-center text-xl text-primary">
                      <item.icon></item.icon>
                    </span>
                    <span className="font-semibold text-base text-white">
                      {item.title}
                    </span>
                  </li>
                </Link>
            )
          )
        }
          <li onClick={() => signOut()}  className="hover:bg-black text-center py-2 px-1 cursor-pointer rounded-md transition duration-400">
            <span className="flex items-center justify-center text-xl text-red-600">
              {
                loading ? <svg
                role="status"
                className={`w-6 h-6 mr-2 text-gray-200 animate-spin fill-dark`}
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg> :
              <IoExitOutline />
              }
            </span>
          <span className="font-semibold text-base text-red-800 my-2">
              {!loading && 'Sign out'}
            </span>
          </li>
        </ul>
      
    </>
  );
};

export default SideNavigation;