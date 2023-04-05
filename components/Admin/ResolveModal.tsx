import { Transition, Dialog } from "@headlessui/react";
import { useState, Fragment } from "react";
import { useResolveChallengeMutation } from "../../generated/graphql";
import Button from "../shared/Button";
import Success from "../shared/Success";
import { Challenge as ChallengeType } from "../../generated/graphql";
import Image from "next/image";
import Error from "../shared/Error";

export const ResolveModal = ({ challenge, isOpen, close }: { challenge: ChallengeType, isOpen: boolean, close: () => void }) => {

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

                                        <div className={`${winnedId == challenge.awayPlayer?.id ? "border-primary" : "border-gray-600"} border-4  transition duration-150 py-8 px-16 rounded-lg cursor-pointer`} onClick={() => setWinnerId(challenge.awayPlayer?.id)}>
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className="w-14 h-14 bg-dark rounded-md">
                                                    {challenge.awayPlayer?.avatar != null ? (

                                                        <Image
                                                            src={challenge.awayPlayer?.avatar}
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
                                                    {challenge.awayPlayer?.username}
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
