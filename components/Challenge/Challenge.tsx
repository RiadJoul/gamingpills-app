import React, { useState } from "react";
import Button from "../shared/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { GiPill, GiSofa } from "react-icons/gi";
import { FaPlaystation, FaTimes, FaXbox } from "react-icons/fa";
import FeedbackModal from "../Modals/FeedbackModal";
import { BsClock } from "react-icons/bs";
import {
  Platform,
  Status,
  Challenge,
  useJoinChallengeMutation,
  useCancelPendingChallengeMutation,
} from "../../generated/graphql";
import SupportModal from "../Modals/SupportModal";
import useAuth from "../../services/useAuth";
import { useCountdown } from "../../hooks/useCountdown";

const Challenge = ({ challenge }: { challenge: Challenge }) => {
  //@ts-ignore
  const { user }: User = useAuth();
  const router = useRouter();
  const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  //graphql
  const [, JoinChallenge] = useJoinChallengeMutation();
  const [, CancelPendingChallenge] = useCancelPendingChallengeMutation();
  //responses
  const [loading,setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<string>(null);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [success, setSucess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>();
  const Join = async () => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorField(null);
    setErrorMessage(null);
    const response = await JoinChallenge({ id: challenge.id });
    if (response.data?.JoinChallenge.errors) {
      setErrorField(response.data.JoinChallenge.errors[0].field);
      setErrorMessage(response.data.JoinChallenge.errors[0].message);
    } else {
      setSucess(true);
      setSuccessMessage("Joined successfully! Redirecting you to the lobby...");
      setTimeout(() => router.push("/game/lobby/" + challenge.id), 1000);
    }
    setLoading(false);
  };

  const Cancel = async () => {
    setLoading(true);
    setSuccessMessage(null)
    setErrorField(null);
    setErrorMessage(null);
    const response = await CancelPendingChallenge({ id: challenge.id });
    if (response.data?.cancelPendingChallenge.errors) {
      setErrorField(response.data.cancelPendingChallenge.errors[0].field);
      setErrorMessage(response.data.cancelPendingChallenge.errors[0].message);
    } else {
      setSucess(true);
      setSuccessMessage('Challenge cancelled')
      setTimeout(() => router.push("/player/feed"), 1000);
    }
    setLoading(false);
  }


  let createdAt = new Date(challenge.createdAt);
  let expiresAt = useCountdown(new Date(createdAt.setMinutes(createdAt.getMinutes() + 5)))

  const formattedMinutes = expiresAt[0] < 10 ? '0' + expiresAt[0] : expiresAt[0];
  const formattedSeconds = expiresAt[1] < 10 ? "0" + expiresAt[1] : expiresAt[1];


  return (
    <>
      <FeedbackModal
        title={"Success"}
        feedback={successMessage}
        type={"success"}
        cancelText={"Close"}
        show={success}
        close={() => setSucess(false)}
        loading={loading}
      />

      <FeedbackModal
        title={errorField}
        feedback={errorMessage}
        type={"error"}
        cancelText={"Close"}
        show={errorField ? true : false}
        close={() => setErrorField(null)}
        loading={loading}
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
        feedback={"Are you sure you want to cancel the challenge?"}
        onClick={() => {
          Cancel();
        }}
        ctaText={"Yes"}
        cancelText={"No"}
        show={showCancelConfirmation}
        close={() => setShowCancelConfirmation(false)}
        loading={loading}
      />
      <SupportModal show={showSupport} close={() => setShowSupport(false)} />
      <div className="px-4 py-2 w-full text-center rounded-md border shadow-md bg-dark border-dark">
        <div className="flex justify-between">
          <p
            className={
              "font-semibold uppercase text-lg " +
              (challenge.platform == Platform.Ps4 ||
                challenge.platform == Platform.Ps5
                ? "text-blue-600"
                : "text-green-600")
            }
          >
            {challenge.platform == Platform.Ps4 ||
              challenge.platform == Platform.Ps5 ? (
              <FaPlaystation />
            ) : (
              <FaXbox />
            )}
          </p>
          {
            challenge.status == Status.Pending &&
          <div className="flex">
            {
              expiresAt[0] < 0 && expiresAt[1] < 0 ? <>
                <p className="font-semibold text-sm md:text-base italic text-red-400">
                  Expired!
                </p>
                <BsClock className="text-sm lg:text-xl mt-0.5 lg:mt-0 ml-2 text-red-400" />
              </> :
                <>
                  <p className="font-semibold text-sm md:text-base text-white">
                      {formattedMinutes + ":" + formattedSeconds}
                  </p><BsClock className="text-sm lg:text-xl mt-0.5 lg:mt-0 ml-2 text-white" /></>
            }

          </div>
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
            {
              challenge.status == Status.Finished ?
                <span className="bg-gray-800 text-gray-100 font-semibold uppercase px-2.5 py-0.5 rounded">

                  {challenge.homeScore ? challenge.homeScore + " - " + challenge.awayScore : "Resolved"}

                </span> : <h1 className="text-base absolute mt-6 mx-5 items-center lg:text-xl text-white font-bold flex flex-col justify-center">
                  <span className="bg-black text-primary font-semibold uppercase px-2.5 py-0.5 rounded">
                    {challenge.bet}$
                  </span>
                </h1>
            }
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
              {challenge.awayPlayer
                ? challenge.awayPlayer.username
                : "Waiting ..."}
            </h5>
          </div>
        </div>
        <div className="flex justify-center space-x-1 mt-3 text-sm lg:text-base">
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
          <span className="bg-blue-900 text-gray-100 font-semibold uppercase px-2.5 py-0.5 rounded">
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
        {
          user &&
          <div className="flex justify-center mt-3">
            {challenge.status == Status.Pending && challenge.homePlayer.id == user.id && (
              <Button
                text={`Cancel challenge`}
                bgColor="red"
                textColor="white"
                size={"medium"}
                icon={FaTimes}
                onClick={() => setShowCancelConfirmation(true)}
                width={"most"}
              />
            )}
            {challenge.status == Status.Pending && challenge.homePlayer.id != user.id && (
              <Button
                text={`JOIN FOR ${challenge.bet}$`}
                bgColor="white"
                textColor="primary-focus"
                size={"medium"}
                icon={GiPill}
                onClick={() => setShowJoinConfirmation(true)}
                width={"most"}
              />
            )}
            {challenge.status == Status.Active && (
              <Button
                text="Lobby"
                bgColor="white"
                textColor="primary-focus"
                size={"medium"}
                icon={GiSofa}
                onClick={() => router.push("/game/lobby/" + challenge.id)}
                width={"most"}
              />
            )}
            {challenge.status == Status.Finished && (
              <Button
                text="Lobby"
                bgColor="white"
                textColor="primary-focus"
                size={"medium"}
                icon={GiSofa}
                onClick={() => router.push("/game/lobby/" + challenge.id)}
                width={"most"}
              />
            )}

            {challenge.status == Status.Disputed && (
              <Button
                text="Lobby"
                bgColor="white"
                textColor="primary-focus"
                size={"medium"}
                icon={GiSofa}
                onClick={() => router.push("/game/lobby/" + challenge.id)}
                width={"most"}
              />
            )}
          </div>
        }
      </div>
    </>
  );
};

export default Challenge;
