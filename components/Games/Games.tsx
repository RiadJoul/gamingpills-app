import React from "react";
import Game from "./Game";
import {Game as GameType} from '../../generated/graphql';

interface Props {
  games: GameType[];
}

const Games = ({games}:Props) => {

  return (
    <>
      {games && games.length > 0 && (
        <>
          <h1 className="text-base mb-2 md:text-lg text-white font-semibold">
            Games
          </h1>
          <div className="w-full overflow-x-auto mx-auto  shadow-xl">
            <div className="flex flex-col">
              <div className="flex">
                <ul className="flex items-center justify-center space-x-4">
                  {games.map((game) => (
                    <Game
                      key={game.id}
                      name={game.name}
                      category={game.category}
                      src={game.cover}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Games;
