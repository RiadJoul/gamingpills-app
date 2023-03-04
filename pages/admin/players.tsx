import { Dialog, Tab, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Chat from "../../components/Chat/Chat";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import PageHead from "../../components/Shared/PageHead";
import { useIsAuth } from "../../services/useIsAuth";
import Image from "next/image";
import { useBanPlayerMutation, usePlayerQuery, usePlayersQuery, User, useUnbanPlayerMutation } from "../../generated/graphql";
import Loading from "../../components/Shared/Loading";
import NoData from "../../components/Shared/NoData";
import Button from "../../components/Shared/Button";
import FeedbackModal from "../../components/Modals/FeedbackModal";
import moment from "moment";
import Input from "../../components/Shared/Input";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}


const Players = () => {
    const ref = useRef(null);
    useIsAuth();
    const router = useRouter();
    const { index } = router.query;

    const [selectedIndex, setSelectedIndex] = useState(index ? index : 0);

    //graphql
    const [result] = usePlayersQuery();
    const { data } = result;

    useEffect(() => {
        ref.current.value = '';
    }, [selectedIndex])
    return (
        <>
            <PageHead title="Players" />
            <TopNavigation />
            <main className="min-h-screen bg-black grid grid-cols-12">
                <aside className="hidden md:flex flex-col mt-5 col-span-2 items-end text-white shadow mb-5">
                    <SideNavigation />
                </aside>
                <div className="col-span-12 md:col-span-7 mt-5">
                    <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
                        <div className="space-y-2">
                            <h1 className="text-white text-2xl font-bold">Players</h1>
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
                                        Active Players
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
                                        Banned Players
                                    </Tab>
                                </Tab.List>
                                {
                                    <>

                                        <div className="relative mb-2">
                                            <div className="flex absolute text-white inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <BiSearch />
                                            </div>
                                            <input ref={ref} type="text" className="text-sm rounded-lg  block w-full pl-10 p-2.5  bg-dark placeholder-gray-500 text-white" placeholder="Player username" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <button className="bg-primary p-2 mx-1 text-white rounded-md hover:bg-primary-focus"
                                                onClick={() => { }}
                                            >Search</button>
                                            <h4 className="text-white">6 results</h4>
                                        </div>
                                        {
                                            !data ? <Loading /> :
                                                <Tab.Panels className="mt-2 mb-20">
                                                    <Tab.Panel className="space-y-2">
                                                        {
                                                            data.players.activePlayers.length > 0 ?
                                                                data.players.activePlayers.map((player) => (
                                                                    <Player player={player} />
                                                                )) : <NoData title="No Active Player" />
                                                        }
                                                    </Tab.Panel>
                                                    <Tab.Panel className="space-y-2">
                                                        {
                                                            data.players.bannedPlayers.length > 0 ?
                                                                data.players.bannedPlayers.map((player) => (
                                                                    <Player player={player} />
                                                                )) : <NoData title="No Banned Player" />
                                                        }
                                                    </Tab.Panel>
                                                </Tab.Panels>
                                        }

                                    </>
                                }
                            </Tab.Group>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex col-span-3 mx-5 h-screen mt-5 pb-36">
                    <Chat />
                </div>
            </main>
        </>
    )
}

export default Players;


const Player = ({ player }: { player: User }) => {


    const [loading, setLoading] = useState<boolean>(false);

    //graphql
    const [, banPlayer] = useBanPlayerMutation();
    const [, unbanPlayer] = useUnbanPlayerMutation();
    //response
    const [successMessage, setSuccessMessage] = useState<string>();
    const [errorField, setErrorField] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();

    const [isShowingPlayerInfo, setIsShowingPlayerInfo] = useState<boolean>(false);
    const [isShowingPlayerWallet, setIsShowingPlayerWallet] = useState<boolean>(false);

    const BanPlayer = async () => {
        setLoading(true);
        setSuccessMessage(null);
        setErrorField(null);
        setErrorMessage(null);
        const response = await banPlayer({ id: player.id });
        if (response.data?.banPlayer.errors) {
            setErrorField(response.data.banPlayer.errors[0].field);
            setErrorMessage(response.data.banPlayer.errors[0].message);
        } else {
            setSuccessMessage("Player Banned");
        }
        setLoading(false);
    };

    const UnbanPlayer = async () => {
        setLoading(true);
        setSuccessMessage(null);
        setErrorField(null);
        setErrorMessage(null);
        const response = await unbanPlayer({ id: player.id });
        if (response.data?.unbanPlayer.errors) {
            setErrorField(response.data.unbanPlayer.errors[0].field);
            setErrorMessage(response.data.unbanPlayer.errors[0].message);
        } else {
            setSuccessMessage("Player Unbanned");
        }
        setLoading(false);
    }


    return (
        <>
            <FeedbackModal
                title={"Success"}
                feedback={successMessage}
                type={"success"}
                cancelText={"Close"}
                show={successMessage ? true : false}
                close={() => setSuccessMessage(null)}
            />

            <FeedbackModal
                title={errorField}
                feedback={errorMessage}
                type={"error"}
                cancelText={"Close"}
                show={errorField ? true : false}
                close={() => setErrorField(null)}

            />
            <PlayerInformationModal id={player.id} isOpen={isShowingPlayerInfo} close={() => setIsShowingPlayerInfo(false)} />
            <PlayerWalletModal id={player.id} isOpen={isShowingPlayerWallet} close={() => setIsShowingPlayerWallet(false)}/>
            <div className="flex justify-between w-full space-x-3 px-3 text-sm lg:text-base bg-dark rounded-md text-white py-3 items-center">
                <div className="w-14 h-14 bg-dark rounded-md">
                    {player.avatar != null ? (

                        <Image
                            src={player.avatar}
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
                    )}
                </div>
                <p>{player.username}</p>
                {
                    player.banned ? <p className="text-red-600">BANNED</p> : <p className="text-green-600">ACTIVE</p>
                }


                <p>{player.Wallet.balance}$</p>
                <div className="flex space-x-2">

                    <Button text="Wallet" textColor={"white"} bgColor={"green"} size={"small"} width={"most"} onClick={() => setIsShowingPlayerWallet(true)} />
                    <Button text="Details" textColor={"white"} bgColor={"primary"} size={"small"} width={"most"} onClick={() => setIsShowingPlayerInfo(true)} />
                    {
                        player.banned ? <Button text="Unban" textColor={"white"} bgColor={"green"} size={"small"} width={"most"} onClick={() => UnbanPlayer()} loading={loading} />
                            : <Button text="Ban" textColor={"white"} bgColor={"red"} size={"small"} width={"most"} onClick={() => BanPlayer()} loading={loading} />
                    }

                </div>
            </div>
        </>
    )
}


const PlayerInformationModal = ({ id, isOpen, close }: { id: string, isOpen: boolean, close: () => void }) => {

    const variable = {
        id: id
    };
    const [player, reexecuteQuery] = usePlayerQuery({ variables: variable, pause: true });
    const { data } = player;

    useEffect(() => {
        if (isOpen) {
            reexecuteQuery();
        }
    }, [isOpen])

    return (
        <>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10 max-h-screen"

                    onClose={() => close()}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto text-xs lg:text-base">
                        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                                    {data ?
                                        <>
                                            <div className="bg-dark p-5 text-white flex flex-col text-center space-y-4">
                                                <div className="flex justify-center">

                                                    <div className="flex flex-col items-center space-y-2">
                                                        <div className="w-14 h-14 bg-dark rounded-md">
                                                            {data.player.avatar != null ? (

                                                                <Image
                                                                    src={data.player.avatar}
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
                                                            )}
                                                        </div>

                                                        <span className="font-semibold text-xs lg:text-base text-white">
                                                            {data.player.username}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Input label="ID:" type={"text"} disabled={true} placeholder={data.player.id} />
                                                <Input label="username:" type={"text"} disabled={true} placeholder={data.player.username} />
                                                <Input label="name:" type={"text"} disabled={true} placeholder={data.player.firstName + ' ' + data.player.lastName} />
                                                <Input label="banned:" type={"text"} disabled={true} placeholder={data.player.banned.toString()} />
                                                <Input label="email:" type={"text"} disabled={true} placeholder={data.player.email} />
                                                <Input label="email verified:" type={"text"} disabled={true} placeholder={data.player.emailVerified.toString()} />
                                                <Input label="psnId:" type={"text"} disabled={true} placeholder={data.player.psnId} />
                                                <Input label="xboxId:" type={"text"} disabled={true} placeholder={data.player.xboxId} />
                                                <Input label="Date of birth:" type={"text"} disabled={true} placeholder={moment(data.player.birthDate).format('MMMM Do YYYY, h:mm a')} />
                                                <div className="flex space-x-3">
                                                    <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 w-full rounded-md" onClick={() => close()}>Close</button>

                                                </div>
                                            </div>

                                        </>
                                        : <Loading />
                                    }

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

        </>

    )
}

const PlayerWalletModal = ({ id, isOpen, close }: { id: string, isOpen: boolean, close: () => void }) => {

    const variable = {
        id: id
    };
    

    return (
        <>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10 max-h-screen"

                    onClose={() => close()}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto text-xs lg:text-base">
                        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                                <div className="bg-dark p-5 text-white flex flex-col text-center space-y-4">
                                                <div className="flex justify-center">

                                                    <div className="flex flex-col items-center space-y-2">
                                                       

                                                        
                                                    </div>
                                                </div>
                                                
                                                <div className="flex space-x-3">
                                                    <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 w-full rounded-md" onClick={() => close()}>Close</button>

                                                </div>
                                            </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

        </>

    )
}