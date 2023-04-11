import moment from "moment";
import { useState } from "react";
import { User } from "../../generated/graphql";
import { PlayerModal } from "./PlayerModal";

interface Props {
  player: User;
}

export const PlayerCard = ({ player }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <PlayerModal
        playerId={player.id}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      />
      <div className="flex justify-between w-full space-x-3 px-3 text-sm lg:text-base bg-dark rounded-md text-white py-3 items-center">
        <p>{player.username}</p>
        <p className={`${player.banned ? "text-red-700" : "text-green-600"} uppercase`}>{player.banned ? "Banned" : "Active"}</p>

        <p className="text-xs">last seen {moment(player.lastSeen).fromNow()}</p>
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
