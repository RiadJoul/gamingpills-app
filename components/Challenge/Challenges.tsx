import React, { useState } from "react";
import { Challenge as ChallengeType } from "../../generated/graphql";
import useAuth from "../../services/useAuth";
import Loading from "../shared/Loading";
import NoData from "../shared/NoData";
import Challenge from "./Challenge";
import {Game as GameType} from '../../generated/graphql';

interface Props {
  games: GameType[];
  challenges: ChallengeType[];
}

const Challenges = ({ games,challenges }: Props) => {
  //@ts-ignore
  const { user }: User = useAuth();
  const [filterSelected, setFilterSelected] = useState<number>(games[0].id);
  const filteredChallenges = challenges.filter(challenge => challenge.game.id == filterSelected && challenge.homePlayer.id != user.id);

  
  return (
    <>
    <div className="flex justify-between items-center pt-5">
      <h1 className="text-base mb-2 md:text-lg text-white font-semibold ">
        Challenges
      </h1>
      <div className="space-x-1">
          {
            games && games.map((game) => (
              <button key={game.id} className={` ${filterSelected == game.id ? 'bg-dark' : 'bg-dark opacity-70'}
                text-white text-sm md:text-base px-3 py-1 rounded-md transition duration-400`} onClick={() => setFilterSelected(game.id)}>{game.name}</button>
            ))
          }
      </div>
    </div>

      {!challenges ? (
        <Loading />
      ) : (
        [
          filteredChallenges.length > 0 ? (
            <div className="flex flex-col space-y-3 justify-center">
              {filteredChallenges.map((challenge) => (
                <Challenge key={challenge.id} challenge={challenge} />
              ))}
            </div>
          ) : (
            <NoData
              title={`No ${games.find(x => x.id === filterSelected).name} challenges has been found`}
              description="You can create a challenge or find an opponent in the chat"
            />
          ),
        ]
      )}
    </>
  );
};
export default Challenges;
