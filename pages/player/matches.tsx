import React, { useEffect, useState } from "react";
import FooterNavigation from "../../components/Navigation/FooterNavigation";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import PageHead from "../../components/shared/PageHead";
import { Tab } from "@headlessui/react";
import Invites from "../../components/Invite/Invites";
import { useMatchesQuery } from "../../generated/graphql";
import Chat from "../../components/Chat/Chat";
import { useIsAuth } from "../../services/useIsAuth";
import useAuth from "../../services/useAuth";
import { useRouter } from "next/router";
import ChallengeList from "../../components/Challenge/ChallengeList";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Matches = () => {
  useIsAuth();
  const router = useRouter();
  const { index } = router.query;

  const [selectedIndex, setSelectedIndex] = useState(index ? index : 0);

  const [result] = useMatchesQuery();
  const { data ,fetching} = result;

  //@ts-ignore
  const {user}:User = useAuth();



  return user && (
    <>
      <PageHead title="Matches" />
      <TopNavigation />
      <main className="min-h-screen bg-black grid grid-cols-12">
      <aside className="hidden md:flex flex-col mt-7 col-span-2 items-end text-white shadow mb-5">
          <SideNavigation />
        </aside>

        <div className="col-span-12 md:col-span-6 mt-5 mx-3 lg:mx-5">
          <div className="flex flex-col justify-center">
            <div className="w-full px-2 sm:px-0">
              <h1 className="text-base mb-2 md:text-lg text-white font-semibold uppercase">
                Matches
              </h1>
              <Tab.Group
              //@ts-ignore
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
              >
                <Tab.List className="flex space-x-1 rounded-xl bg-dark p-1">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm lg:text-base font-medium leading-5 text-white",
                        selected
                          ? "bg-white shadow text-primary-focus font-semibold"
                          : "text-blue-100 hover:bg-black hover:text-white"
                      )
                    }
                  >
                    Active Challenge
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm lg:text-base font-medium leading-5 text-white",
                        selected
                          ? "bg-white shadow text-primary-focus font-semibold"
                          : "text-blue-100 hover:bg-black hover:text-white"
                      )
                    }
                  >
                    Invites
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm lg:text-base font-medium leading-5 text-white",
                        selected
                          ? "bg-white shadow text-primary-focus font-semibold"
                          : "text-blue-100 hover:bg-black hover:text-white"
                      )
                    }
                  >
                    Finished Challenges
                  </Tab>
                </Tab.List>
                {
                  !fetching && <>
                    <Tab.Panels className="mt-2 mb-20">
                      <Tab.Panel className="space-y-2">
                        <ChallengeList challenges={data && data.matches.activeChallenges} fetching={fetching} 
                        noDataTitle={"You have no active challenges"} 
                        noDataDescription={"You can create a challenge or find an opponent in the chat"}
                        />
                      </Tab.Panel>
                      <Tab.Panel className="space-y-2">
                      <Invites invites={data && data.matches.invites} />
                      </Tab.Panel>
                      <Tab.Panel className="space-y-2">
                      <ChallengeList challenges={data && data.matches.finishedChallenges} fetching={fetching} 
                      noDataTitle={"no challenges has been found"} 
                      noDataDescription={"You can create a challenge or find an opponent in the chat"}
                      />
                      </Tab.Panel>
                    </Tab.Panels>

                  </>
                }
              </Tab.Group>
            </div>
          </div>
          <FooterNavigation />
        </div>
        
              <Chat/>
        
      </main>
    </>
  );
};

export default Matches;
