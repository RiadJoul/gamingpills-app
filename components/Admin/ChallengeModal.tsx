import { Transition, Dialog } from "@headlessui/react";
import { useEffect, useState, Fragment } from "react";
import { useChallengeQuery, Status } from "../../generated/graphql";
import Input from "../shared/Input";
import Loading from "../shared/Loading";
import Image from "next/image";
import moment from "moment";
import { ResolveModal } from "./ResolveModal";
import { useRouter } from "next/router";
export const ChallengeModal = ({ challengeId, isOpen, close }: { challengeId: string, isOpen: boolean, close: () => void; }) => {
    const router = useRouter();
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
                                                    {
                                                        data.challenge.status == Status.Active || data.challenge.status == Status.Finished && <button className="bg-primary-focus hover:bg-primary text-white px-3 py-2 w-full rounded-md" onClick={() => router.push("/game/lobby/" + challengeId)}>Lobby</button>
                                                    }
                                                    {
                                                        data.challenge.status == Status.Disputed && <button className="bg-primary-focus hover:bg-primary text-white px-3 py-2 w-full rounded-md" onClick={() => router.push("/game/lobby/" + challengeId)}>Lobby</button>
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