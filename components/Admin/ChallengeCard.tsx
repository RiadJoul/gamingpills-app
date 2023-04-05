import moment from "moment";
import { useState } from "react";
import { Challenge, Status } from "../../generated/graphql";
import { ChallengeModal } from "./ChallengeModal";

interface Props {
  challenge: Challenge;
}

export const ChallengeCard = ({ challenge }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <ChallengeModal
        challengeId={challenge.id}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      />

      <div className="flex justify-between w-full space-x-3 px-3 text-sm lg:text-base bg-dark rounded-md text-white py-3 items-center">
        {challenge.status == Status.Active && (
          <p className="text-green-600">ACTIVE</p>
        )}
        {challenge.status == Status.Disputed && (
          <p className="text-yellow-600">DISPUTED</p>
        )}
        {challenge.status == Status.Finished && (
          <p className="text-primary">FINISHED</p>
        )}
        <p>{challenge.id}</p>
        <p>{challenge.bet}$</p>
        <p>{moment(challenge.createdAt).fromNow()}</p>
        <button
          className="bg-primary p-2 mx-1 text-white rounded-md hover:bg-primary-focus"
          onClick={() => setIsOpen(true)}
        >
          Details
        </button>
      </div>
    </>
  );
};
