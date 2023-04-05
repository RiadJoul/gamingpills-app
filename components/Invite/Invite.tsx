import { useRouter } from "next/router";
import Image from 'next/image'
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiPill } from "react-icons/gi";
import { Challenge, Platform, useJoinChallengeMutation, useRejectInviteMutation } from "../../generated/graphql";
import FeedbackModal from "../Modals/FeedbackModal";
import SupportModal from "../Modals/SupportModal";
import Button from "../shared/Button";
import { useCountdown } from "../../hooks/useCountdown";
import { BsClock } from "react-icons/bs";

interface Props {
    challenge: Challenge
}

const Invite = ({ challenge }: Props) => {
    const router = useRouter();
    const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
    const [showRejectConfirmation, setShowRejectConfirmation] = useState(false);
    const [showSupport, setShowSupport] = useState(false);
    //graphql
    const [, JoinChallenge] = useJoinChallengeMutation();
    const [, RejectInvite] = useRejectInviteMutation();
    //responses
    const [errorField, setErrorField] = useState<string>(null);
    const [errorMessage, setErrorMessage] = useState<string>(null);
    const [success, setSucess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const Join = async () => {
        setLoading(true);
        setErrorField(null);
        setErrorMessage(null);
        const response = await JoinChallenge({ id: challenge.id });
        if (response.data?.JoinChallenge.errors) {
            setErrorField(response.data.JoinChallenge.errors[0].field);
            setErrorMessage(response.data.JoinChallenge.errors[0].message);
        } else {
            setSucess(true);
            setTimeout(() => router.push("/game/lobby/" + challenge.id), 1000);
        }
        setLoading(false);
    };

    const Reject = async () => {
        setLoading(true);
        setErrorField(null);
        setErrorMessage(null);
        const response = await RejectInvite({ id: challenge.id });
        if (response.data?.rejectInvite.errors) {
            setErrorField(response.data.rejectInvite.errors[0].field);
            setErrorMessage(response.data.rejectInvite.errors[0].message);
        } else {
            setSucess(true);
            setTimeout(() => router.push("/player/matches"), 1000);
        }
        setLoading(false);
    }

    let createdAt = new Date(challenge.createdAt);

    let expiresAt = useCountdown(new Date(createdAt.setMinutes(createdAt.getMinutes() + 5)))

    return (
        <>
            <FeedbackModal
                title={"Success"}
                feedback={''}
                type={"success"}
                cancelText={"Close"}
                show={success}
                close={() => setSucess(false)}
            />

            <FeedbackModal
                title={errorField}
                feedback={errorMessage}
                type={"error"}
                cancelText={"Close"}
                show={errorField ? true : false}
                close={() => setErrorField(null)}
            />

            <FeedbackModal
                type={"confirmation"}
                title={"Challenge"}
                feedback={"Are you sure you want to join this challenge?"}
                onClick={() => {
                    Join();
                }}
                ctaText={"Join"}
                cancelText={"Cancel"}
                show={showJoinConfirmation}
                close={() => setShowJoinConfirmation(false)}
                loading={loading}
            />

            <FeedbackModal
                type={"confirmation"}
                title={"Challenge"}
                feedback={"Are you sure you want to cancel this challenge?"}
                onClick={() => {
                    Reject();
                }}
                ctaText={"Yes"}
                cancelText={"No"}
                show={showRejectConfirmation}
                close={() => setShowRejectConfirmation(false)}
                loading={loading}
            />

            <SupportModal show={showSupport} close={() => setShowSupport(false)} />
            <div className="px-4 py-3 w-full text-center rounded-md border shadow-md bg-dark border-dark">
                <div className="flex justify-end">
                    {
                        expiresAt[0] < 0 && expiresAt[1] < 0 ? <>
                            <p className="font-semibold text-sm md:text-base italic text-red-400">
                                Expired!
                            </p>
                            <BsClock className="text-sm lg:text-xl mt-0.5 lg:mt-0 ml-2 text-red-400" />
                        </> :
                            <>
                                <p className="font-semibold text-sm md:text-base text-white">
                                    {expiresAt[0] < 10 ? '0' + expiresAt[0] : expiresAt[0]} : {expiresAt[1] < 10 ? "0" + expiresAt[1] : expiresAt[1]}
                                </p><BsClock className="text-sm lg:text-xl mt-0.5 lg:mt-0 ml-2 text-white" /></>
                    }

                </div>
                <div className="flex justify-evenly">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-18 bg-dark rounded-md">
                            {challenge.homePlayer.avatar ? (
                                <Image
                                    src={challenge.homePlayer.avatar}
                                    objectFit={"cover"}
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                    alt="player avatar"
                                />
                            ) : (
                                <Image
                                    src="/images/profile.png"
                                    objectFit={"cover"}
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                    alt="player avatar"
                                />
                            )}
                        </div>
                        <h5 className="text-sm lg:text-base font-medium text-white">
                            {challenge.homePlayer.username}
                        </h5>
                    </div>
                    <h1 className="text-base absolute mt-6 mx-5 items-center lg:text-xl text-white font-bold flex flex-col justify-center">
                        <span className="bg-black text-primary font-semibold uppercase px-2.5 py-0.5 rounded">
                            {challenge.bet}$
                        </span>
                    </h1>

                    <div className="flex flex-col items-center">
                        <div className="w-16 h-18 bg-dark rounded-md">
                            {challenge.awayPlayer?.avatar ? (
                                <Image
                                    src={challenge.awayPlayer.avatar}
                                    objectFit={"cover"}
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                    alt="player avatar"
                                />
                            ) : (
                                <Image
                                    src="/images/profile.png"
                                    objectFit={"cover"}
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                    alt="player avatar"
                                />
                            )}
                        </div>
                        <h5 className="text-sm lg:text-base font-medium text-white">
                            {challenge.awayPlayer?.username}
                        </h5>
                    </div>
                </div>
                <div className="flex justify-center space-x-1 mt-3 text-xs lg:text-sm">
                    <span
                        className={
                            "font-semibold uppercase px-2.5 py-0.5 rounded " +
                            (challenge.platform == Platform.Ps5 ||
                                challenge.platform == Platform.Ps4
                                ? "bg-blue-200 text-blue-800"
                                : "bg-green-200 text-green-800 ")
                        }
                    >
                        {challenge.platform}
                    </span>
                    <span className="bg-gray-800 text-gray-100 font-semibold uppercase px-2.5 py-0.5 rounded">
                        {challenge.game.name}
                    </span>
                    <span className="bg-blue-100 text-blue-800 font-semibold uppercase px-2.5 py-0.5 rounded">
                        {challenge.gameMode.name}
                    </span>
                </div>
                {challenge.comment && (
                    <p className="text-white font-semibold text-sm md:text-base my-4">
                        "{challenge.comment}"
                    </p>
                )}
                <div className="flex justify-center mt-3 space-x-2">

                    <Button
                        text={`ACCEPT FOR ${challenge.bet}$`}
                        bgColor="white"
                        textColor="primary-focus"
                        size={"medium"}
                        icon={GiPill}
                        onClick={() => setShowJoinConfirmation(true)}
                        width={"most"}
                    />
                    <Button
                        text={`DECLINE`}
                        bgColor="red"
                        textColor="white"
                        size={"medium"}
                        icon={FaTimes}
                        onClick={() => setShowRejectConfirmation(true)}
                        width={"most"}
                    />

                </div>
            </div>
        </>
    )
}

export default Invite;