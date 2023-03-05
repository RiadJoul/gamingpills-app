import { Challenge as ChallengeType } from "../../generated/graphql";
import Loading from "../shared/Loading";
import NoData from "../shared/NoData";
import Challenge from "./Challenge";

interface Props {
  challenges: ChallengeType[]
}
const ActiveChallenges = ({challenges}:Props) => {

  return (
    <>
      {!challenges ? (
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
                title="You have no active challenges"
                description="You can create a challenge or find an opponent in the chat"
              />
            ),
          ],
        ]
      )}
    </>
  );
};

export default ActiveChallenges;
