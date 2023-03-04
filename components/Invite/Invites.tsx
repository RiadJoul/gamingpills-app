import { Challenge } from "../../generated/graphql";
import Loading from "../Shared/Loading";
import NoData from "../Shared/NoData";
import Invite from "./Invite";

interface Props {
  invites: Challenge[];
}
const Invites = ({invites}:Props) => {
  
  return (
    <>
      {!invites ? (
        <Loading />
      ) : (
        [
          invites.length > 0 ? (
            <div className="flex flex-col space-y-3 justify-center">
              {invites.map((challenge) => (
                <Invite key={challenge.id} challenge={challenge} />
              ))}
            </div>
          ) : (
            <NoData title="No invites" />
          ),
        ]
      )}
    </>
  );
};

export default Invites;
