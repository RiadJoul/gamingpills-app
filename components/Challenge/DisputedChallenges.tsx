import {
  usePlayerDisputedChallengesQuery,
} from "../../generated/graphql";
import Loading from "../shared/Loading";
import NoData from "../shared/NoData";
import Challenge from "./Challenge";

const DisputedChallenges = () => {
  const [result] = usePlayerDisputedChallengesQuery();

  const { data, fetching } = result;
  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        [
          data && [
            data.playerDisputedChallenges.length > 0 ? (
              <div className="flex flex-col space-y-3 justify-center">
                {data.playerDisputedChallenges.map((challenge) => (
                  <Challenge key={challenge.id} challenge={challenge} />
                ))}
              </div>
            ) : (
              <NoData
                title={"You do not have any dispute, That's good!"}
                description={
                  "Instructions: If you have a disputed match please take a picture of the screen providing the actual result of the match."
                }
              />
            ),
          ],
        ]
      )}
    </>
  );
};

export default DisputedChallenges;
