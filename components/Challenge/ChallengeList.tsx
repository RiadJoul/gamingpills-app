import React from "react";
import { Challenge as ChallengeType } from "../../generated/graphql";
import Loading from "../shared/Loading";
import NoData from "../shared/NoData";
import Challenge from "./Challenge";

interface Props {
    challenges: ChallengeType[],
    fetching: boolean,
    noDataTitle: string,
    noDataDescription: string,
}

const ChallengeList = ({challenges,fetching,noDataTitle,noDataDescription}:Props) => {
    return (
        <>
          {fetching ? (
            <Loading />
          ) : (
            [
              challenges && [
                challenges.length > 0 ? (
                  <div className="flex flex-col space-y-3 justify-center">
                    {challenges.map((challenge) => (
                      <Challenge key={challenge.id} challenge={challenge} />
                    ))}
                  </div>
                ) : (
                  <NoData
                    title={noDataTitle}
                    description={noDataDescription}
                  />
                ),
              ],
            ]
          )}
        </>
      );
}

export default ChallengeList;