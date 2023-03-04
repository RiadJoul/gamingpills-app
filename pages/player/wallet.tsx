import { Tab } from "@headlessui/react";
import React, { useState } from "react";
import Chat from "../../components/Chat/Chat";
import FooterNavigation from "../../components/Navigation/FooterNavigation";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import PageHead from "../../components/Shared/PageHead";
import PaymentOptions from "../../components/Wallet/PaymentOptions";
import Transactions from "../../components/Wallet/Transactions";
import WalletBalance from "../../components/Wallet/WalletBalance";
import { useIsAuth } from "../../services/useIsAuth";
import useAuth from "../../services/useAuth";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Wallet = () => {
  useIsAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);
  //@ts-ignore
  const {user}:User = useAuth();
  return user && (
    <>
      <PageHead title="Wallet" />
      <TopNavigation />
      <main className="min-h-screen bg-black grid grid-cols-12">
      <aside className="hidden md:flex flex-col mt-7 col-span-2 items-end text-white shadow mb-5">
          <SideNavigation />
        </aside>

        <div className="col-span-12 md:col-span-6 mt-5">
          <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
            <h1 className="text-base mb-2 md:text-lg text-white font-semibold">
              Wallet
            </h1>
            <Tab.Group
              selectedIndex={selectedIndex}
              onChange={setSelectedIndex}
            >
              <Tab.List className="flex space-x-1 rounded-xl bg-dark p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white",
                      selected
                        ? "bg-white shadow text-primary-focus"
                        : "text-blue-100 hover:bg-black hover:text-white"
                    )
                  }
                >
                  Buy funds
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white",
                      selected
                        ? "bg-white shadow text-primary-focus"
                        : "text-blue-100 hover:bg-black hover:text-white"
                    )
                  }
                >
                  Withdraw
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel className="space-y-2">
                  <PaymentOptions />
                </Tab.Panel>
                <Tab.Panel className="space-y-2">
                <WalletBalance/>
                <Transactions/>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
          <FooterNavigation />
        </div>
        <div className="hidden md:flex col-span-3 h-screen mt-5 pb-36">
              <Chat/>
        </div>
      </main>
    </>
  );
};

export default Wallet;
