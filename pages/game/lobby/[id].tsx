import React, { useState } from "react";
import { useRouter } from "next/router";
import SideNavigation from "../../../components/Navigation/SideNavigation";
import TopNavigation from "../../../components/Navigation/TopNavigation";
import PageHead from "../../../components/shared/PageHead";
import InfoCard from "../../../components/Lobby/InfoCard";
import { IoArrowBack } from "react-icons/io5";
import ChallengeCard from "../../../components/Lobby/ChallengeCard";
import { useChallengeQuery, useResultsQuery } from "../../../generated/graphql";
import NoData from "../../../components/shared/NoData";
import FifaRulesCard from "../../../components/Lobby/FifaRulesCard";
import Loading from "../../../components/shared/Loading";
import ResultsModal from "../../../components/Modals/ResultsModal";
import Chat from "../../../components/Chat/Chat";
import { useIsAuth } from "../../../services/useIsAuth";
import useAuth from "../../../services/useAuth";
import { User } from "../../../generated/graphql";
import { BsChatLeftText } from "react-icons/bs";
import MobileChat from "../../../components/Chat/MobileChat";

const Match = () => {
  useIsAuth();



  const router = useRouter();
  const { id } = router.query;
  const variable = {
    id: typeof id === "string" ? id : null,
  };
  const [challengeResult] = useChallengeQuery({ variables: variable });
  const { data, fetching } = challengeResult;

  const [resultsResult, reexecuteQuery] = useResultsQuery({ variables: variable });

  const checkIfResultsAreUploaded = () => {
    reexecuteQuery();
  }

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  //@ts-ignore
  const { user }: User = useAuth();
  return user && (
    <>
      {resultsResult.data && (
        <ResultsModal
          show={true}
          challenge={challengeResult.data.challenge}
          results={resultsResult.data.results}
        />
      )}
      <PageHead title="Lobby" />

      <TopNavigation />

      <MobileChat isOpen={isChatOpen} close={() => setIsChatOpen(false)} />
      <main className="h-full bg-black grid grid-cols-12">
        <aside className="hidden md:flex flex-col mt-7 col-span-2 items-end text-white shadow mb-5">
          <SideNavigation />
        </aside>
        <div className="col-span-12 md:col-span-6 mt-5">
          <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
            <div className="space-y-2">
              <div
                className="md:hidden flex justify-start my-5 cursor-pointer"
                onClick={() => router.back()}
              >
                <IoArrowBack className="font-semibold text-white text-2xl" />
              </div>
              <div className="flex justify-between text-sm lg:text-lg">
                <h1 className=" mb-2 text-white font-semibold">
                  Match Lobby
                </h1>
                <h1 className="mb-2 text-white font-semibold">
                  <span className="text-primary">ID:</span> {data && data.challenge ? id : ''}
                </h1>
              </div>
              {fetching && <Loading />}
              {!fetching && data && data.challenge ? (
                <>
                  <ChallengeCard  challenge={data.challenge} refetch={checkIfResultsAreUploaded} />
                  <InfoCard challenge={data.challenge} />
                  <FifaRulesCard />
                </>
              ) : (
                <NoData
                  title={"Not Found"}
                  description={"Challenge was not found"}
                />
              )}
            </div>
          </div>
        </div>
        
          <Chat challengeId={id}/>
      
        <div className='fixed bottom-0 w-full md:hidden'>
          <button className='bottom-0 my-8 text-base flex mr-10 items-center float-right px-5 py-2 bg-primary text-white font-bold tracking-wide rounded-md focus:outline-none' onClick={() => setIsChatOpen(true
          )}>Chat <BsChatLeftText className="ml-2" /></button>
        </div>
      </main>
    </>
  );
};

export default Match;
