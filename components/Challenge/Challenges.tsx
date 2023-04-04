import React, { useEffect, useState } from "react";
import { Challenge as ChallengeType } from "../../generated/graphql";
import useAuth from "../../services/useAuth";
import Loading from "../shared/Loading";
import NoData from "../shared/NoData";
import Challenge from "./Challenge";
import { Game as GameType } from '../../generated/graphql';
import Button from "../shared/Button";

interface Props {
  games: GameType[];
  challenges: ChallengeType[];
  loadMore: any
  hasMore: boolean
}

const Challenges = ({ games, challenges, loadMore, hasMore}: Props) => {
  //@ts-ignore
  const { user }: User = useAuth();
  const [filterSelected, setFilterSelected] = useState<number>(null);
  const [filteredChallenges,setFilteredChallenges] = useState<ChallengeType[]>();

  useEffect(() => {
    if(challenges)
      setFilteredChallenges(challenges.filter(challenge => challenge.game.id == filterSelected && challenge.homePlayer.id != user.id))
  },[challenges,filterSelected])

  
  return (
    <>
      <div className="flex justify-between items-center pt-5">
        <h1 className="text-base mb-2 md:text-lg text-white font-semibold uppercase">
          Challenges
        </h1>
        
        <div className="space-x-1">
     {filterSelected && <button className="bg-dark text-white text-sm md:text-base px-3 py-1 mr-5 rounded-md transition duration-400 uppercase" onClick={() => setFilterSelected(null)}>clear filter</button>}   
          {
            games && games.map((game) => (
              <button key={game.id} className={` ${filterSelected == game.id ? 'bg-dark' : 'bg-dark opacity-70'}
                text-white text-sm md:text-base px-3 py-1 rounded-md transition duration-400`} onClick={() => setFilterSelected(game.id)}>{game.name.toLocaleUpperCase()}</button>
            ))
          }
          
        </div>
      </div>

      {!challenges ? (
        <Loading />
      ) : (
        [
          filterSelected ? filteredChallenges.length > 0 ? (
            <div className="flex flex-col space-y-3 justify-center">
              {filteredChallenges.map((challenge) => (
                <Challenge key={challenge.id} challenge={challenge} />
              ))}
              
              {
                hasMore && <div className="flex justify-end">
                <Button 
                  text="Load more" 
                  textColor={"white"} 
                  bgColor={"dark"} 
                  size={"small"} 
                  width={"xmin"} 
                  onClick={() => loadMore()} 
                />
              </div> 
              }

            </div>
          ) : (
            <NoData
              title={`No ${games.find(x => x.id === filterSelected).name.toLocaleUpperCase()} challenges has been found`}
              description="You can create a challenge or find an opponent in the chat"
            />
          ) : challenges && challenges.length > 0 ? (
            <div className="flex flex-col space-y-3 justify-center">
              {challenges.map((challenge) => (
                <Challenge key={challenge.id} challenge={challenge} />
              ))}
              {
                hasMore && <div className="flex justify-end">
                <Button 
                  text="Load more" 
                  textColor={"white"} 
                  bgColor={"dark"} 
                  size={"small"} 
                  width={"xmin"} 
                  onClick={() => loadMore()} 
                />
              </div> 
              }
              

            </div>
          ) : (
            <NoData
              title={`No challenges has been found`}
              description="You can create a challenge or find an opponent in the chat"
            />
          )
          
        ]
      )}
    </>
  );
};
export default Challenges;
