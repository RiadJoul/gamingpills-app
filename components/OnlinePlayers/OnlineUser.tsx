import React, { useState } from "react";
import Image from "next/image";
import PlayerInformationModal from "../Modals/PlayerInformationModal";
import { User } from "../../generated/graphql";


interface Props {
  user: User;
}

const OnlineUser = ({ user }: Props) => {
  const [showPlayerInfo, setShowPlayerInfo] = useState(false);
  return (
    <>
      <PlayerInformationModal
        user={user}
        show={showPlayerInfo}
        close={() => setShowPlayerInfo(false)}
      />
      <li className="flex flex-col items-center space-y-2">
        <div className="cursor-pointer" onClick={() => setShowPlayerInfo(true)}>
          <div className="w-14 h-14 bg-dark rounded-md">
            {user.avatar != null ? (
              <Image
                src={user.avatar}
                width={100}
                height={100}
                objectFit={"cover"}
                className="rounded-md"
              />
            ) : (
              <Image
                src="/images/profile.png"
                width={100}
                height={100}
                className="rounded-md"
              />
            )}
          </div>
        </div>
        <span className="font-semibold text-xs text-white">
          {user.username}
        </span>
      </li>
    </>
  );
};

export default OnlineUser;
