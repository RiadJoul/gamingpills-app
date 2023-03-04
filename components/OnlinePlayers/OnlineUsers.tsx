import React from "react";
import { User } from "../../generated/graphql";
import OnlineUser from "./OnlineUser";


interface Props {
  users:  User[];
}

const OnlineUsers = ({users}: Props) => {

  return (
    <>
      {users && users.length > 0 && (
        <>
          <h1 className="text-base mb-2 md:text-lg text-white font-semibold uppercase">
            Online Players
          </h1>
          <div className="w-full relative overflow-x-auto mx-auto  shadow-xl">
            <div className="flex flex-col">
              <div className="flex">
                <ul className="flex items-center justify-center space-x-3">
                  {users.map((user) => (
                    <OnlineUser key={user.id} user={user} />
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

export default OnlineUsers;