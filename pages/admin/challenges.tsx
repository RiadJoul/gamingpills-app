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
import { useChallengesQuery } from "../../generated/graphql";




const Challenges = () => { 
  //graphql
  const [result] = useChallengesQuery();

  const { data, fetching } = result;

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTabName, setActiveTabName] = useState("active challenges");


  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  return (
    <>
        <ChallengeSearchModal isOpen={isSearching} close={() => setIsSearching(false) }/>
      <PageHead title="Challenges" />
      <TopNavigation />
      <main className="min-h-screen bg-black grid grid-cols-12">
        <aside className="hidden md:flex flex-col mt-5 col-span-2 items-end text-white shadow mb-5">
          <SideNavigation />
        </aside>
        <div className="col-span-12 md:col-span-6 mt-5">
            {
                fetching && <Loading/>
            }
            {
                data && <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-base mb-2 ml-2 md:text-lg text-white font-semibold uppercase">
                      Challenges
                    </h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1 md:space-y-0  items-center">
                      <StatCard
                        title={"Active"}
                        amount={data.challenges.challengesStats.activeChallenges}
                        icon={<CgPill />}
                        active={activeTabIndex == 0}
                        onClick={() => {
                          setActiveTabName("active challenges");
                          setActiveTabIndex(0);
                        }}
                      />
                      <StatCard
                        title={"Pending"}
                        amount={data.challenges.challengesStats.pendingChallenges}
                        icon={<MdPendingActions />}
                        active={activeTabIndex == 1}
                        onClick={() => {
                          setActiveTabName("pending challenges");
                          setActiveTabIndex(1);
                        }}
                      />
                      <StatCard
                        title={"Disputed"}
                        amount={data.challenges.challengesStats.disputedChallenges}
                        icon={<RiSwordLine />}
                        active={activeTabIndex == 2}
                        onClick={() => {
                          setActiveTabName("disputed challenges");
                          setActiveTabIndex(2);
                        }}
                      />
                      <StatCard
                        title={"Finished"}
                        amount={data.challenges.challengesStats.finishedChallenges}
                        icon={<MdSportsScore />}
                        active={activeTabIndex == 3}
                        onClick={() => {
                          setActiveTabName("finished challenges");
                          setActiveTabIndex(3);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-base mb-2 ml-2 md:text-lg text-white font-semibold uppercase">
                        {activeTabName}
                      </h1>
                      <div>
                        <Button text="Search by id" textColor={"white"} bgColor={"dark"} size={"large"} width={"full"} onClick={() => setIsSearching(true)}/>
                      </div>
                    </div>
                    <p className="text-gray-200 ml-1 text-sm">Last 10 {activeTabName}</p>
                  </div>
                  {
                    activeTabIndex == 0 && [
                        data.challenges.activeChallenges.length > 0 ? data.challenges.activeChallenges.map((challenge) => (
                            <ChallengeCard key={challenge.id} challenge={challenge}/>
                        )) : <NoData title={"No Active challenges"}/>
                    ] 
                  }
                  {
                    activeTabIndex == 1 && [
                        data.challenges.pendingChallenges.length > 0 ? data.challenges.pendingChallenges.map((challenge) => (
                            <ChallengeCard key={challenge.id} challenge={challenge}/>
                        )) : <NoData title={"No Pending challenges"}/>
                    ] 
                  }
                  {
                    activeTabIndex == 2 && [
                        data.challenges.disputedChallenges.length > 0 ? data.challenges.disputedChallenges.map((challenge) => (
                            <ChallengeCard key={challenge.id} challenge={challenge}/>
                        )) : <NoData title={"No Disputed challenges :)"}/>
                    ] 
                  }
                  {
                    activeTabIndex == 3 && [
                        data.challenges.finishedChallenges.length > 0 ? data.challenges.finishedChallenges.map((challenge) => (
                            <ChallengeCard key={challenge.id} challenge={challenge}/>
                        )) : <NoData title={"No Finished challenges"}/>
                    ] 
                  }
                </div>
              </div>
            }
          
        </div>
        <Chat />
      </main>
    </>
  );
};

export default Challenges;
