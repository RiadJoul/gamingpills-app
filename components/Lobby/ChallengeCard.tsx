import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsCash } from "react-icons/bs";
import { FaPlaystation, FaRegHandshake, FaXbox } from "react-icons/fa";
import { MdSportsScore } from "react-icons/md";
import Button from "../shared/Button";
import { Challenge, Platform, Status } from "../../generated/graphql";
import { useUploadResultsMutation } from "../../generated/graphql";
import FeedbackModal from "../Modals/FeedbackModal";
import SupportModal from "../Modals/SupportModal";
import { useCountdown } from "../../hooks/useCountdown";

interface Props {
  challenge: Challenge;
  refetch: any
}



function isInThePast(date:Date) {
  const now = new Date();
  return date < now;
}

function addMinutes(date:Date, minutes:number) {
  return new Date(date.getTime() + minutes*60000);
}

const ChallengeCard = ({ challenge, refetch }: Props) => {
  const [isEnteringScore, setIsEnteringScore] = useState(false);
  const [homeScore, setHomeScore] = useState<number>(0);
  const [awayScore, setAwayScore] = useState<number>(0);
  const [showSupport, setShowSupport] = useState(false);
  //graphql
  const [, uploadResults] = useUploadResultsMutation();
  //responses
  const [loading, setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);

  //countdown to let players enter score
  const updatedAt = new Date(challenge.updatedAt);
  const tenMinutesLater = addMinutes(new Date(challenge.updatedAt),10)

  //this a countdown to let the players upload scores
  const allowedIn = useCountdown(new Date(updatedAt.setMinutes(updatedAt.getMinutes() + 10)));
  const formattedMinutes = allowedIn[0] < 10 ? '0' + allowedIn[0] : allowedIn[0];
  const formattedSeconds = allowedIn[1] < 10 ? "0" + allowedIn[1] : allowedIn[1];
  //check if its been past 10 minutes
  const isAllowed = isInThePast(tenMinutesLater);


  const Upload = async () => {
    refetch();
    if (homeScore == null || awayScore == null) return null;
    setLoading(true);
    setErrorField(null);
    setErrorMessage(null);
    const response = await uploadResults({
      id: challenge.id,
      homeScore: homeScore,
      awayScore: awayScore,
    });
    if (response.data?.uploadResults.errors) {
      setErrorField(response.data.uploadResults.errors[0].field);
      setErrorMessage(response.data.uploadResults.errors[0].message);
    } else {
      setSucess(true);
    }
    setIsEnteringScore(false)
    setLoading(false);
  };

  useEffect(() => {
    if (challenge.status == Status.Active || isAllowed) {
      const MINUTE_MS = 30000; // 30 seconds
      const interval = setInterval(() => {
        refetch();
      }, MINUTE_MS);
      return () => clearInterval(interval);
    }
  }, [])

  return (
    <>
      <FeedbackModal
        title={"Success"}
        feedback={
          "waiting for other player..."
        }
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
        onClick={() => { }}
      />
      <SupportModal show={showSupport} close={() => setShowSupport(false)} />
      <div className="px-4 py-3 w-full text-center rounded-md border shadow-md bg-dark border-dark">
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
          
          <p className="bg-black px-2 py-1 rounded-md text-primary text-base lg:text-lg font-bold uppercase">${challenge.bet} bet</p>
          
        </div>
        <div className="flex justify-evenly">
          <div className="flex flex-col items-center pt-5 pb-1">
            <div className="w-16 h-18 bg-dark rounded-md">
              {challenge.homePlayer?.avatar ? (
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
            <h5 className="my-2 text-base lg:text-lg font-medium text-white">
              {challenge.homePlayer.username}
            </h5>
          </div>
          <h1 className="text-base absolute mt-12 mx-5 items-center lg:text-xl text-white font-bold flex flex-col justify-center">
            <span className="bg-gray-800 text-gray-100 font-semibold uppercase px-2.5 py-0.5 rounded">
              {challenge.status == Status.Finished
                ? [
                  challenge.homeScore ? challenge.homeScore + " - " + challenge.awayScore : "Resolved"
                ]
                : "VS"}
            </span>
          </h1>

          <div className="flex flex-col items-center pt-5 pb-1">
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
            <h5 className="my-2 text-base lg:text-lg font-medium text-white">
              {challenge.awayPlayer.username}
            </h5>
          </div>
        </div>
        <div className="flex justify-center space-x-1 text-sm lg:text-base">
          <span
            className={
              "font-semibold uppercase px-2.5 py-0.5 rounded " +
              (challenge.platform == Platform.Ps4 ||
                challenge.platform == Platform.Ps5
                ? "bg-blue-200 text-blue-800"
                : "bg-green-200 text-green-800 ")
            }
          >
            #{challenge.platform}
          </span>
          <span className="bg-gray-800 text-gray-100 font-semibold uppercase px-2.5 py-0.5 rounded">
            #{challenge.game.name}
          </span>
          <span className="bg-blue-100 text-blue-800 font-semibold uppercase px-2.5 py-0.5 rounded">
            #{challenge.gameMode.name}
          </span>
        </div>
        <div className="flex justify-center mt-5">
          {challenge.status == Status.Active && !isEnteringScore && (
            <Button
              text={isAllowed ? "Enter score" : `You can enter the score in ${formattedMinutes} : ${formattedSeconds}`}
              disabled={!isAllowed}
              bgColor="white"
              textColor={isAllowed ? "green" : "red"}
              size={"medium"}
              icon={MdSportsScore}
              onClick={() => { refetch(); setIsEnteringScore(true) }}
              width={"most"}
            />
          )}
          {challenge.status == Status.Disputed && (
            <Button
              text="Resolve"
              bgColor="white"
              textColor="primary-focus"
              size={"medium"}
              icon={FaRegHandshake}
              onClick={() => setShowSupport(true)}
              width={"most"}
            />
          )}
          {isEnteringScore && (
            <div className="px-4 py-3 w-full lg:w-2/3 text-center rounded-lg bg-dark">
              <div className="flex justify-evenly items-center space-x-10 text-white">

                <div className="flex space-y-2">
                  <div className="flex justify-center items-center text-8xl text-white bg-dark font-semibold text-center">
                    <input type="text" placeholder={'0'} onChange={(e) => setHomeScore(parseInt(e.target.value))} onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }} maxLength={2} className="bg-dark outline-0 w-full text-center py-5 font-semibold" />
                  </div>
                </div>
                <h4 className="text-white text-8xl">-</h4>
                <div className="flex space-y-2">
                  <div className="flex justify-center items-center text-8xl text-white bg-dark font-semibold text-center">
                    <input type="text" placeholder={'0'} onChange={(e) => setAwayScore(parseInt(e.target.value))} onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }} maxLength={2} className="bg-dark outline-0 w-full text-center py-5 font-semibold" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <Button
                  text="Enter"
                  bgColor="white"
                  textColor="black"
                  size={"medium"}
                  icon={MdSportsScore}
                  onClick={() => {
                    Upload();
                  }}
                  width={"most"}
                  loading={loading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChallengeCard;