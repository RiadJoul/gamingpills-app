import { useState } from "react";
import { CgPill } from "react-icons/cg";
import { MdPendingActions, MdSportsScore } from "react-icons/md";
import { RiSwordLine } from "react-icons/ri";
import { ChallengeCard } from "../../components/Admin/ChallengeCard";
import { ChallengeSearchModal } from "../../components/Admin/ChallengeSearchModal";
import StatCard from "../../components/Admin/StatCard";
import Chat from "../../components/Chat/Chat";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import Button from "../../components/shared/Button";
import Loading from "../../components/shared/Loading";
import NoData from "../../components/shared/NoData";
import PageHead from "../../components/shared/PageHead";
import { usePlayersQuery } from "../../generated/graphql";

const Players = () => {
  //graphql
  const [result] = usePlayersQuery();

  const { data, fetching } = result;

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTabName, setActiveTabName] = useState("active challenges");

  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <>
      <ChallengeSearchModal
        isOpen={isSearching}
        close={() => setIsSearching(false)}
      />
      <PageHead title="Players" />
      <TopNavigation />
      <main className="min-h-screen bg-black grid grid-cols-12">
        <aside className="hidden md:flex flex-col mt-5 col-span-2 items-end text-white shadow mb-5">
          <SideNavigation />
        </aside>
        <div className="col-span-12 md:col-span-6 mt-5">
          {fetching && <Loading />}
          {data && (
            <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
              <div className="space-y-4">
                <div>
                  <h1 className="text-base mb-2 ml-2 md:text-lg text-white font-semibold uppercase">
                    Players
                  </h1>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1 md:space-y-0  items-center">
                    <StatCard
                      title={"Online players"}
                      amount={data.players.onlinePlayersCount}
                      icon={<CgPill />}
                      active={activeTabIndex == 0}
                      onClick={() => {
                        setActiveTabName("online players");
                        setActiveTabIndex(0);
                      }}
                    />
                    <StatCard
                      title={"Banned players"}
                      amount={data.players.bannedPlayersCount}
                      icon={<CgPill />}
                      active={activeTabIndex == 1}
                      onClick={() => {
                        setActiveTabName("banned players");
                        setActiveTabIndex(1);
                      }}
                    />
                    <StatCard
                      title={"Total Balances"}
                      amount={`$${data.players.totalBalances}`}
                      icon={<MdPendingActions />}
                    />

                    <StatCard
                      title={"Today Deposits"}
                      amount={`$${data.players.todayTotalDeposits}`}
                      icon={<MdPendingActions />}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-base mb-2 ml-2 md:text-lg text-white font-semibold uppercase">
                      {activeTabName}
                    </h1>
                    <div>
                      <Button
                        text="Search by username"
                        textColor={"white"}
                        bgColor={"dark"}
                        size={"large"}
                        width={"full"}
                        onClick={() => setIsSearching(true)}
                      />
                    </div>
                  </div>
                  <p className="text-gray-200 ml-1 text-sm">
                    recently {activeTabName}
                  </p>
                </div>
                {/* {activeTabIndex == 0 && [
                  data.challenges.activeChallenges.length > 0 ? (
                    data.challenges.activeChallenges.map((challenge) => (
                      <ChallengeCard challenge={challenge} />
                    ))
                  ) : (
                    <NoData title={"No Active challenges"} />
                  ),
                ]}
                {activeTabIndex == 1 && [
                  data.challenges.pendingChallenges.length > 0 ? (
                    data.challenges.pendingChallenges.map((challenge) => (
                      <ChallengeCard challenge={challenge} />
                    ))
                  ) : (
                    <NoData title={"No Pending challenges"} />
                  ),
                ]} */}
              </div>
            </div>
          )}
        </div>
        <Chat />
      </main>
    </>
  );
};

export default Players;
