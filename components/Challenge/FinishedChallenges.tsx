import { Challenge as ChallengeType } from "../../generated/graphql";
import Loading from "../shared/Loading";
import NoData from "../shared/NoData";
import Challenge from "./Challenge";

interface Props {
  challenges: ChallengeType[]
}

const FinishedChallenges = ({challenges}:Props) => {

  return (
    <>
      {!challenges ? <Loading /> : 
        [
          challenges.length > 0 ? (
            <div className="flex flex-col space-y-2 justify-center">
              {challenges.map((challenge) => (
                <Challenge key={challenge.id} challenge={challenge} />
              ))}
            </div>
          ) : (
            <NoData
              title="no challenges has been found"
              description="You can create a challenge or find an opponent in the chat"
            />
          ),
        ]
      }
      
    </>
  );
}

export default FinishedChallenges;