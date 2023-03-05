import { Transition, Dialog } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { usePlayerStatsQuery, User } from "../../generated/graphql";

import Button from "../shared/Button";
import Loading from "../shared/Loading";
import ChallengeModal from "../Challenge/ChallengeModal";

interface Props {
  user: User;
  show: boolean;
  close: () => void;
}

const PlayerInformationModal = (props: Props) => {
  const closeButtonRef = useRef(null);
  const [invite, setInvite] = useState<boolean>(false);

  const [playerStats,reexecuteQuery] = usePlayerStatsQuery({variables: {id:props.user.id},pause:true});
  const { data} = playerStats;

  useEffect(() => {
      if(props.show)
      reexecuteQuery();
  },[props.show])
  
  return (
    <>
      <ChallengeModal
        show={invite}
        close={() => setInvite(false)}
        user={props.user}
      />
      <Transition.Root show={props.show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={closeButtonRef}
          onClose={props.close}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-dark bg-opacity-80 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-black font-primary rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                  {
                    !data ? <Loading /> :
                      <div className="flex flex-col space-y-10 py-5">
                        <div className="flex justify-evenly divide-x-2 divide-dark">
                          <div className="flex flex-col justify-center text-lg lg:text-xl font-bold">
                            <h1 className="text-red-700 uppercase">loss</h1>
                            <h1 className="text-red-500">{data.playerStats.losses}</h1>
                          </div>
                          <div className="pl-10">
                            {props.user.avatar != null ? (
                              <Image
                                src={props.user.avatar}
                                width={100}
                                height={100}
                                objectFit={"cover"}
                                className="w-24 h-24 shadow-lg rounded-md"
                              />
                            ) : (
                              <Image
                                src="/images/profile.png"
                                width={100}
                                height={100}
                                className="rounded-md"
                              />
                            )}
                            <h5 className="text-lg lg:text-xl text-center font-medium text-white">
                              {props.user.username}
                            </h5>
                          </div>
                          <div className="flex flex-col justify-center text-lg lg:text-xl pl-10 font-bold">
                            <h1 className="text-green-700 uppercase">wins</h1>
                            <h1 className="text-green-500">{data.playerStats.wins}</h1>
                          </div>
                        </div>
                        <div
                          className="flex justify-center space-x-2 my-5 w-full
                    "
                        >
                          <Button
                            text={"Close"}
                            textColor={"white"}
                            bgColor={"dark"}
                            size={"medium"}
                            width={"min"}
                            onClick={() => props.close()}
                          />
                          <Button
                            text={"Invite"}
                            textColor={"white"}
                            bgColor={"primary"}
                            size={"medium"}
                            width={"min"}
                            onClick={() => setInvite(true)}
                          />
                        </div>
                      </div>
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default PlayerInformationModal;
