import React from "react";
import { Challenge as ChallengeType } from "../../generated/graphql";
import Challenge from "./Challenge";

interface Props {
  challenges: ChallengeType[];
}

const MyChallenges = ({ challenges }: Props) => {
  console.log(challenges
    )
  return (
    challenges.length > 0 && (
      <div className="flex flex-col space-y-3 justify-center">
        <h1 className="text-base mb-2 md:text-lg text-primary font-semibold uppercase">
          Active Challenge
        </h1>
        {challenges.map((challenge) => (
          <Challenge key={challenge.id} challenge={challenge} />
        ))}
      </div>
    )
  );
};
export default MyChallenges;