import { Dialog, Tab, Transition } from "@headlessui/react";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Chat from "../../components/Chat/Chat";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import Loading from "../../components/shared/Loading";
import NoData from "../../components/shared/NoData";
import PageHead from "../../components/shared/PageHead";
import { Challenge as ChallengeType, Status, useChallengeQuery, useChallengesQuery, useResolveChallengeMutation } from "../../generated/graphql";
import Image from "next/image";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import Success from "../../components/shared/Success";
import Error from "../../components/shared/Error";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}


const Challenges = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    //graphql
    const [result] = useChallengesQuery();
    const { data, fetching } = result;

    const [searchId, setSearchId] = useState<string>();


    return (
        <>
            <PageHead title="Challenges" />
            <TopNavigation />
            <main className="min-h-screen bg-black grid grid-cols-12">
                <aside className="hidden md:flex flex-col mt-5 col-span-2 items-end text-white shadow mb-5">
                    <SideNavigation />
                </aside>
                <div className="col-span-12 md:col-span-7 mt-5">
                    <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
                        <div className="space-y-2">
                            <h1 className="text-white text-2xl font-bold">Challenges</h1>
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
                                        Active Challenges
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
                                        Disputed Challenges {data && data.challenges.disputedChallenges.length > 0 && <span className="p-1 ml-3 bg-red-500 rounded-md text-white">{data.challenges.disputedChallenges.length}</span>}
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
                                    <>

                                        <div className="relative mb-2">
                                            <div className="flex absolute text-white inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <BiSearch />
                                            </div>
                                            <input onChange={(e) => setSearchId(e.target.value)} type="text" className="text-sm rounded-lg  block w-full pl-10 p-2.5  bg-dark placeholder-gray-500 text-white" placeholder="Challenge id" />
                                        </div>

                                        <SearchChallenge searchId={searchId} />
                                        {
                                            fetching && <Loading />
                                        }
                                        {
                                            !fetching && data &&
                                            <Tab.Panels className="mt-2 mb-20">
                                                <Tab.Panel className="space-y-2">
                                                    {
                                                        data.challenges.activeChallenges.length > 0 ?
                                                            data.challenges.activeChallenges.map((challenge) => (
                                                                <Challenge challenge={challenge} />
                                                            )) : <NoData title={"No Active Challenges"} />
                                                    }
                                                </Tab.Panel>
                                                <Tab.Panel className="space-y-2">
                                                    {
                                                        data.challenges.disputedChallenges.length > 0 ?
                                                            data.challenges.disputedChallenges.map((challenge) => (
                                                                <Challenge challenge={challenge} />
                                                            )) : <NoData title="No Disputed Challenged :)" />
                                                    }
                                                </Tab.Panel>
                                                <Tab.Panel className="space-y-2">
                                                    {data.challenges.finishedChallenges.length > 0 ?
                                                        data.challenges.finishedChallenges.map((challenge) => (
                                                            <Challenge challenge={challenge} />
                                                        )) : <NoData title="No Finished Challenges yet" />
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


const SearchChallenge = ({ searchId }: { searchId: string }) => {

    const [result, reexecuteQuery] = useChallengeQuery({ variables: { id: searchId }, pause: true });

    const { data } = result;

    return (
        <>


            <div className="flex justify-between items-center">
                <button className="bg-primary p-2 mx-1 text-white rounded-md hover:bg-primary-focus"
                    onClick={() => reexecuteQuery()}
                >Search</button>

            </div>
            <h4 className="text-green-700">
                    Results
            </h4>
            {
                data && data.challenge &&
                <Challenge challenge={data.challenge} />
            }
                <h4 className="text-green-700">
                    --------------------------------------
            </h4>
        </>
    )
}

interface Props {
    challenge: ChallengeType
}

const Challenge = ({ challenge }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>

            <ChallengeModal challengeId={challenge.id} isOpen={isOpen} close={() => setIsOpen(false)} />

            <div className="flex justify-between w-full space-x-3 px-3 text-sm lg:text-base bg-dark rounded-md text-white py-3 items-center">
                {
                    challenge.status == Status.Active && <p className="text-green-600">ACTIVE</p>
                }
                {
                    challenge.status == Status.Disputed && <p className="text-yellow-600">DISPUTED</p>
                }
                {
                    challenge.status == Status.Finished && <p className="text-primary">FINISHED</p>
                }
                <p>{challenge.id}</p>
                <p>{challenge.bet}$</p>
                <p>{moment(challenge.createdAt).fromNow()}</p>
                <button className="bg-primary p-2 mx-1 text-white rounded-md hover:bg-primary-focus"
                    onClick={() => setIsOpen(true)}
                >Details</button>
            </div>
        </>
    )
}


const ChallengeModal = ({ challengeId, isOpen, close }: { challengeId: string, isOpen: boolean, close: () => void; }) => {
    const variable = {
        id: challengeId
    };
    const [challengeResult, reexecuteQuery] = useChallengeQuery({ variables: variable, pause: true });
    const { data } = challengeResult;

    useEffect(() => {
        if (isOpen) {
            reexecuteQuery();
        }
    }, [isOpen])

    const [isResolveModalOpen, setIsResolveModalOpen] = useState<boolean>(false);

    return (
        <>

            {data && <ResolveModal challenge={data.challenge} isOpen={isResolveModalOpen} close={() => setIsResolveModalOpen(false)} />}
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
                                                <div className="flex justify-evenly">

                                                    <div className="flex flex-col items-center space-y-2">
                                                        <div className="w-14 h-14 bg-dark rounded-md">
                                                            {data.challenge.homePlayer.avatar != null ? (

                                                                <Image
                                                                    src={data.challenge.homePlayer.avatar}
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
                                                            {data.challenge.homePlayer.username}
                                                        </span>
                                                    </div>

                                                    <h1 className="text-white uppercase text-base self-center font-semibold lg:text-lg">
                                                        vs
                                                    </h1>
                                                    {data.challenge.awayPlayer ? (
                                                        <div className="flex flex-col items-center space-y-2">
                                                            <div className="w-14 h-14 bg-dark rounded-md">
                                                                {data.challenge.awayPlayer.avatar != null ? (
                                                                    <Image
                                                                        src={data.challenge.awayPlayer.avatar}
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
                                                                {data.challenge.awayPlayer.username}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center space-y-2">
                                                            <div className="w-14 h-14 bg-dark rounded-md">
                                                                <Image
                                                                    src="/images/profile.png"
                                                                    width={100}
                                                                    height={100}
                                                                    className="rounded-md"
                                                                />
                                                            </div>

                                                            <span className="font-semibold text-xs lg:text-base text-white">
                                                                Waiting...
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <Input label="ID:" type={"text"} disabled={true} placeholder={data.challenge.id} />
                                                <Input label="Bet:" type={"text"} disabled={true} placeholder={data.challenge.bet.toString() + '$'} />
                                                <Input label="Platform:" type={"text"} disabled={true} placeholder={data.challenge.platform} />
                                                <Input label="Game:" type={"text"} disabled={true} placeholder={data.challenge.game.name} />
                                                <Input label="Game Mode:" type={"text"} disabled={true} placeholder={data.challenge.gameMode.name} />
                                                <Input label="Played on:" type={"text"} disabled={true} placeholder={moment(data.challenge.createdAt).format('MMMM Do YYYY, h:mm a')} />
                                                <div className="flex space-x-3">
                                                    <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 w-full rounded-md" onClick={() => close()}>Close</button>
                                                    {
                                                        data.challenge.status == Status.Disputed &&
                                                        <button className="bg-green-800 hover:bg-green-900 p-2 mx-1 text-white w-full rounded-md " onClick={() => setIsResolveModalOpen(true)}>Resolve</button>
                                                    }

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


const ResolveModal = ({ challenge, isOpen, close }: { challenge: ChallengeType, isOpen: boolean, close: () => void }) => {

    const [winnedId, setWinnerId] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    //graphql
    const [, ResolveChallenge] = useResolveChallengeMutation();
    //response
    const [successMessage, setSuccessMessage] = useState<string>();
    const [errorField, setErrorField] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();

    const Resolve = async () => {
        setLoading(true);
        setSuccessMessage(null);
        setErrorField(null);
        setErrorMessage(null);
        const response = await ResolveChallenge({ id: challenge.id, winnerId: winnedId });
        if (response.data?.resolveChallenge.errors) {
            setErrorField(response.data.resolveChallenge.errors[0].field);
            setErrorMessage(response.data.resolveChallenge.errors[0].message);
        } else {
            setSuccessMessage("Challenge Resolved");
        }
        setLoading(false);
    };

    return (
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

                <div className="fixed z-10 inset-0 overflow-y-auto">
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
                            <Dialog.Panel className="relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all text-xs lg:text-base sm:my-8 sm:max-w-lg w-full">
                                <div className="bg-dark p-5 text-white text-center">
                                    <h3 className="mb-5">Who won?</h3>
                                    <div className="flex justify-between space-x-4">
                                        <div className={`${winnedId == challenge.homePlayer.id ? "border-primary" : "border-gray-600"} border-4 transition duration-150 py-8 px-16 rounded-lg cursor-pointer`} onClick={() => setWinnerId(challenge.homePlayer.id)}>
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className="w-14 h-14 bg-dark rounded-md">
                                                    {challenge.homePlayer.avatar != null ? (

                                                        <Image
                                                            src={challenge.homePlayer.avatar}
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
                                                    {challenge.homePlayer.username}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={`${winnedId == challenge.awayPlayer.id ? "border-primary" : "border-gray-600"} border-4  transition duration-150 py-8 px-16 rounded-lg cursor-pointer`} onClick={() => setWinnerId(challenge.awayPlayer.id)}>
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className="w-14 h-14 bg-dark rounded-md">
                                                    {challenge.awayPlayer.avatar != null ? (

                                                        <Image
                                                            src={challenge.awayPlayer.avatar}
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
                                                    {challenge.awayPlayer.username}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-1">
                                        {errorField && (
                                            <Error message={errorField} description={errorMessage} />
                                        )}
                                        {successMessage && (
                                            <Success
                                                message={"success"}
                                                description={successMessage}
                                            />
                                        )}
                                    </div>
                                    <div className="flex space-x-3 mt-5">

                                        <Button text="Close" textColor={"white"} bgColor={"black"} size={"small"} width={"most"} onClick={() => close()} />
                                        <Button text="Resolve" textColor={"white"} bgColor={"primary"} size={"small"} width={"most"} loading={loading} onClick={() => Resolve()} />



                                    </div>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}




export default Challenges;