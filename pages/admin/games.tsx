import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Chat from "../../components/Chat/Chat";
import Image from "next/image";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import PageHead from "../../components/shared/PageHead";
import { Game, useAllGamesQuery, useDeleteGameMutation } from "../../generated/graphql";
import Loading from "../../components/shared/Loading";
import NoData from "../../components/shared/NoData";
import Button from "../../components/shared/Button";
import { MdOutlineAddBox } from "react-icons/md";
import { CreateGameModal } from "../../components/Admin/CreateGameModal";
import { AddGameModeModal } from "../../components/Admin/AddGameModeModal";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Games = () => {
  const router = useRouter();
  const { index } = router.query;

  const [selectedIndex, setSelectedIndex] = useState(index ? index : 0);
  //graphql
  const [result] = useAllGamesQuery();

  const { data, fetching } = result;

  const [isCreatingGameModalOpen,setIsCreatingGameModalOpen] = useState<boolean>(false);
  return (
    <>
    <CreateGameModal isOpen={isCreatingGameModalOpen} close={() => setIsCreatingGameModalOpen(false) }/>
      <PageHead title="Players" />
      <TopNavigation />
      <main className="min-h-screen bg-black grid grid-cols-12">
        <aside className="hidden md:flex flex-col mt-5 col-span-2 items-end text-white shadow mb-5">
          <SideNavigation />
        </aside>
        <div className="col-span-12 md:col-span-6 mt-5">
          <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
            <div className="space-y-2">
              <h1 className="text-white text-2xl font-bold">Games</h1>
              <Tab.Group
                //@ts-ignore
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
              >
                <Tab.List className="flex space-x-1 rounded-xl bg-dark p-1">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm lg:text-base font-medium leading-5",
                        selected
                          ? "bg-white shadow text-primary-focus font-semibold"
                          : "text-blue-100 hover:bg-black hover:text-white"
                      )
                    }
                  >
                    Games
                  </Tab>
                </Tab.List>
                <div className="flex justify-between items-center">
                  <h1 className="text-base mb-2 ml-2 md:text-lg text-white font-semibold uppercase">
                    All games
                  </h1>
                  <div className="flex space-x-3">
                    <Button
                      icon={MdOutlineAddBox}
                      text="Add game"
                      textColor={"white"}
                      bgColor={"dark"}
                      size={"medium"}
                      width={"full"}
                      onClick={() => setIsCreatingGameModalOpen(true)}
                    />
                  </div>
                </div>
                {fetching && <Loading />}
                {data && (
                  <>
                    <Tab.Panels className="mt-2 mb-20">
                      <Tab.Panel className="space-y-2">
                        <div className="w-full overflow-x-auto mx-auto  shadow-xl">
                          <div className="flex flex-col">
                            <div className="flex">
                              <ul className="flex items-center justify-center space-x-4">
                                {data?.allGames.length > 0 ? (
                                  data?.allGames.map((game) => (
                                    <Game
                                      key={game.id}
                                      game={game}
                                    />
                                  ))
                                ) : (
                                  <NoData title={"No games"} />
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </>
                )}
              </Tab.Group>
            </div>
          </div>
        </div>
          <Chat />
      </main>
    </>
  );
};

export default Games;

interface Props {
  game:Game
}
const Game = ({game }: Props) => {
  const [isCreatingGameModeModalOpen,setIsCreatingGameModeModalOpen] = useState<boolean>(false);

  //graphql
  const [, deleteGame] = useDeleteGameMutation();

  //responses
  const [loading, setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);

  const DeleteGame = async () => {
    setLoading(true);
    setErrorField(null);
    setErrorMessage(null);
    const response = await deleteGame({
      id: game.id,
    });
    if (response.data?.deleteGame.errors) {
      setErrorField(response.data.deleteGame.errors[0].field);
      setErrorMessage(response.data.deleteGame.errors[0].message);
    } else {
      setSucess(true);
    }
    setLoading(false);
  }
  return (
    <>
    <AddGameModeModal game={game} isOpen={isCreatingGameModeModalOpen} close={() => setIsCreatingGameModeModalOpen(false)}/>
    <li className="flex flex-col items-center">
      {game.cover && (
        <Image
          src={game.cover}
          width={150}
          height={200}
          className="mb-2 rounded-lg"
          layout="fixed"
        />
      )}
      <h4 className="lg:text-base text-sm text-white italic font-bold uppercase mt-1">
        {game.name}
      </h4>
      <h4 className="lg:text-sm text-xs font-semibold text-gray-50 my-2">
        {game.category}
      </h4>
      
        <div className="flex space-x-2">
        <Button
        text="Deactivate"
        textColor={"white"}
        bgColor={"red"}
        size={"small"}
        width={"half"}
        loading={loading}
        onClick={DeleteGame}
      />
      <Button
        icon={MdOutlineAddBox}
        text="Add game mode"
        textColor={"white"}
        bgColor={"dark"}
        size={"small"}
        width={"half"}
        onClick={() => setIsCreatingGameModeModalOpen(true)}
        />
        </div>
      
    </li>
    </>
    
  );
};
