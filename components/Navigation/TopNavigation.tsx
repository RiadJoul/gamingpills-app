import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MdOutlineMenu } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import Button from "../shared/Button";
import { AdminNavigationItems, PlayerNavigationItems } from "./NavigationItems";
import { IoExitOutline } from "react-icons/io5";
import NavigationItem from "./NavigationItem";
import useAuth from "../../services/useAuth";
import Notifications from "../Notifications/Notifications";
import { Role, useLogoutMutation, useWalletQuery } from "../../generated/graphql";
import { useRouter } from "next/router";



const TopNavigation = () => {
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
  //@ts-ignore
  const {user}:User = useAuth();

  const [balance,setBalance] = useState<number>();
  //graphql
  const [res] = useWalletQuery();

  useEffect(() => {
    if(user && res.data && user.role == Role.Player) {
      setBalance(res.data.wallet.balance);
    }
  },[res])

  return (
    user &&
    <Popover className="bg-black">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center pt-6 md:justify-start md:space-x-20">
              <div className="-mr-2 -my-2 md:hidden">
                {open ? (
                  <Popover.Button className="bg-dark rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-black">
                    <FaTimes className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                ) : (
                  <Popover.Button className="bg-dark rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-black">
                    <MdOutlineMenu className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                )}
              </div>

              {
                 user.role == Role.Player &&
              <div className="flex justify-start lg:flex-1">
                <Notifications/>
              </div>
              }
              <div className="md:flex items-center justify-end md:flex-1 space-x-4">
                {
                  user.role == Role.Player &&
                <div className="hidden md:flex bg-dark rounded-md px-5 py-2">
                  {
                    user.role == Role.Player && [
                      balance ? <h1 className="text-white font-semibold text-sm">{balance}.00 $</h1>
                      : <h1 className="text-white font-semibold text-sm">0.00 $</h1>
                    ]
                  }
                </div>
                }
                
                <div tabIndex={0} className="h-12 w-12 lg:h-16 lg:w-16 mr-2">
                  {
                      user.avatar != null ? (

                        <Image
                          src={user.avatar}
                          width={100}
                          height={100}
                          objectFit={"cover"}
                          className="rounded-md"
                        />
                      ) : (
                        <Image
                          src="/images/profile.png"
                          width={100}
                          height={100}
                          className="rounded-md"
                        />
                      )
                  }
                </div>
              </div>
            </div>
          </div>

          {/* {mobile menu} */}
          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="relative top-0 inset-x-0 p-2 transition transform origin-top-left md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-white ring-opacity-5 bg-dark">
                <div className="flex justify-center px-2 pt-4">

                  <div className="bg-black rounded-md px-5 py-2">
                    {
                      user.role == Role.Player && [
                        balance ? <h1 className="text-white font-semibold text-sm">
                        {balance}.00 $
                      </h1> : <h1 className="text-white font-semibold text-sm">
                      0.00 $
                    </h1>
                      ]
                    }
                  </div>
                </div>
                <div className="pt-2 pb-6 px-5">
                  <div className="mt-3">
                    <nav className="grid gap-y-8">
                      {user.role == Role.Player && PlayerNavigationItems.map(
                        (item) =>
                          item.top && (
                            <NavigationItem
                              key={item.title}
                              title={item.title}
                              href={item.href}
                              icon={item.icon}
                            />
                          )
                      )}
                      {user.role == Role.Admin && AdminNavigationItems.map(
                        (item) =>
                          item.top && (
                            <NavigationItem
                              key={item.title}
                              title={item.title}
                              href={item.href}
                              icon={item.icon}
                            />
                          )
                      )}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <div>
                    <Button
                      bgColor="red"
                      textColor="white"
                      text="Sign out"
                      width="full"
                      size="medium"
                      icon={IoExitOutline}
                      onClick={() => signOut()}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default TopNavigation;
