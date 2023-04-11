import moment from "moment";
import { useState } from "react";
import { CgPill } from "react-icons/cg";
import { FaBan, FaCashRegister } from "react-icons/fa";
import {
  MdAccountBalance,
} from "react-icons/md";
import { PlayerCard } from "../../components/Admin/PlayerCard";
import { PlayerSearchModal } from "../../components/Admin/PlayerSearchModal";
import StatCard from "../../components/Admin/StatCard";
import Chat from "../../components/Chat/Chat";
import FeedbackModal from "../../components/Modals/FeedbackModal";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import Button from "../../components/shared/Button";
import Loading from "../../components/shared/Loading";
import NoData from "../../components/shared/NoData";

import PageHead from "../../components/shared/PageHead";
import { useApproveWithdrawMutation, usePlayersQuery } from "../../generated/graphql";

const Players = () => {
  //graphql
  const [result] = usePlayersQuery();

  const { data, fetching } = result;

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTabName, setActiveTabName] = useState("active challenges");

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [,approve] = useApproveWithdrawMutation();

  //responses
  const [loading, setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);

  const Complete = async (id:number) => {
    setLoading(true);
    const response = await approve({
      id:id
    });
    if (response.data?.approveWithdraw.errors) {
      setErrorField(response.data.approveWithdraw.errors[0].field);
      setErrorMessage(response.data.approveWithdraw.errors[0].message);
    } else {
      setSucess(true);
    }
    setLoading(false);
  }

  return (
    <>
    <FeedbackModal
        title={"Success"}
        feedback={""} 
        type={"success"}
        cancelText={"Close"}
        show={success}
        close={() => setSucess(false)}     />

      <FeedbackModal
        title={errorField}
        feedback={errorMessage}
        type={"error"}
        cancelText={"Close"}
        show={errorField ? true : false}
        close={() => setErrorField(null)}
      />
      <PlayerSearchModal
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
                      icon={<FaBan />}
                      active={activeTabIndex == 1}
                      onClick={() => {
                        setActiveTabName("banned players");
                        setActiveTabIndex(1);
                      }}
                    />
                    <StatCard
                      title={"Pending withdraws"}
                      amount={`$${data.players.pendingWithdrawsCount}`}
                      icon={<FaCashRegister />}
                      active={activeTabIndex == 2}
                      onClick={() => {
                        setActiveTabName("pending withdraws");
                        setActiveTabIndex(2);
                      }}
                    />
                    <StatCard
                      title={"Total Balances"}
                      amount={`$${data.players.totalBalances}`}
                      icon={<MdAccountBalance />}
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
                {activeTabIndex == 0 && [
                  data.players.activePlayers.length > 0 ? (
                    data.players.activePlayers.map((player) => (
                      <PlayerCard key={player.id} player={player} />
                    ))
                  ) : (
                    <NoData title={"No online players"} />
                  ),
                ]}
                {activeTabIndex == 1 && [
                  data.players.bannedPlayers.length > 0 ? (
                    data.players.bannedPlayers.map((player) => (
                      <PlayerCard key={player.id} player={player} />
                    ))
                  ) : (
                    <NoData title={"No banned players"} />
                  ),
                ]}
                {activeTabIndex == 2 && [
                  data.players.pendingWithdraws.length > 0 ? (
                    data.players.pendingWithdraws.map((transaction) => (
                      <div key={transaction.id} className="flex justify-between w-full space-x-3 px-3 text-sm lg:text-base bg-dark rounded-md text-white py-3 items-center">
                        <p>{transaction.user.username}</p>
                        <p
                          
                        >
                          {moment(transaction.createdAt).fromNow()}
                        </p>

                        <p>
                          ${transaction.amount}
                        </p>
                        <Button loading={loading} text="Complete" textColor={"white"} bgColor={"primary"} size={"xsmall"} width={"xmin"} onClick={() => Complete(transaction.id)}/> 
                        
                      </div>
                    ))
                  ) : (
                    <NoData title={"No Pending transactions"} />
                  ),
                ]}
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
