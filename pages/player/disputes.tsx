import React from "react";
import Chat from "../../components/Chat/Chat";
import FooterNavigation from "../../components/Navigation/FooterNavigation";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import PageHead from "../../components/shared/PageHead";
import requireAuth from "../../services/requireAuth";
import useAuth from "../../services/useAuth";
import { usePlayerDisputedChallengesQuery, User } from "../../generated/graphql";
import ChallengeList from "../../components/Challenge/ChallengeList";
const Disputes = () => {
  //@ts-ignore
  const { user }: User = useAuth();

  const [result] = usePlayerDisputedChallengesQuery();

  const { data, fetching } = result;

  return user && (
    <>
      <PageHead title="Disputes" />
      <TopNavigation />
      <main className="min-h-screen bg-black grid grid-cols-12">
        <aside className="hidden md:flex flex-col mt-7 col-span-2 items-end text-white shadow mb-5">
          <SideNavigation />
        </aside>

        <div className="col-span-12 md:col-span-6 mt-5">
          <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
            <div className="space-y-4">
              <h1 className="text-base mb-2 md:text-lg text-white font-semibold uppercase">
                Disputes
              </h1>
              <ChallengeList
                challenges={data?.playerDisputedChallenges}
                noDataTitle={"You do not have any dispute, That's good!"}
                noDataDescription={"Instructions: If you have a disputed match please take a picture of the screen providing the actual result of the match."}
                fetching={fetching}
              />
            </div>
          </div>
          <FooterNavigation />
        </div>

          <Chat />
     

      </main>
    </>
  );
};

export default requireAuth(Disputes);
