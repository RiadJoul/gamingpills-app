import { Transition, Dialog } from "@headlessui/react";
import moment from "moment";
import Image from "next/image";
import { useEffect, Fragment, useState } from "react";
import { Status, Type, useBanPlayerMutation, usePlayerInfoQuery, useUnbanPlayerMutation } from "../../generated/graphql";
import format from "../../services/dateFormatter";
import { useRouter } from "next/router";
import Button from "../shared/Button";
import { PlayerWalletModal } from "./PlayerWalletModal";
import FeedbackModal from "../Modals/FeedbackModal";

export const PlayerModal = ({
  playerId,
  isOpen,
  close,
}: {
  playerId: string;
  isOpen: boolean;
  close: () => void;
}) => {
  const router = useRouter();
  const variable = {
    id: playerId,
  };
  const [playerResult, reexecuteQuery] = usePlayerInfoQuery({
    variables: variable,
    pause: true,
  });
  const { data } = playerResult;

  useEffect(() => {
    if (isOpen) {
      reexecuteQuery();
    }
  }, [isOpen]);


  const [isWalletModalOpen,setWalletModalOpen] = useState<boolean>(false);

  //graphql
  const [, banPlayer] = useBanPlayerMutation();
  const [, unbanPlayer] = useUnbanPlayerMutation();

  //responses
  const [loading, setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);


  const BanPlayer = async () => {
    setLoading(true);
    const response = await banPlayer({
      id:playerId
    });
    if (response.data?.banPlayer.errors) {
      setErrorField(response.data.banPlayer.errors[0].field);
      setErrorMessage(response.data.banPlayer.errors[0].message);
    } else {
      setSucess(true);
    }
    setLoading(false);
  }

  const UnbanPlayer = async () => {
    setLoading(true);
    const response = await unbanPlayer({
      id:playerId
    });
    if (response.data?.unbanPlayer.errors) {
      setErrorField(response.data.unbanPlayer.errors[0].field);
      setErrorMessage(response.data.unbanPlayer.errors[0].message);
    } else {
      setSucess(true);
    }
    setLoading(false);
  }
  

  return (
    <>
    <FeedbackModal
        title={"Success"}
        feedback={""} 
        type={"success"}
        cancelText={"Close"}
        show={success}
        close={() => setSucess(false)}     />

      <FeedbackModal
        title={errorField}
        feedback={errorMessage}
        type={"error"}
        cancelText={"Close"}
        show={errorField ? true : false}
        close={() => setErrorField(null)}
      />
    <PlayerWalletModal playerId={playerId} isOpen={isWalletModalOpen} close={() => setWalletModalOpen(false) }/>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 max-h-screen font-primary"
          onClose={() => close()}
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
            <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto text-sm lg:text-base">
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
                <Dialog.Panel className="relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 ">
                  {data && (
                    <>
                      <div className="bg-dark">
                        <div className="flex items-start justify-evenly p-5 space-x-4">
                          {/* player profile */}
                          <div className="space-y-2">
                          {data.playerInfo.player.avatar != null ? (
                            <Image
                              src={data.playerInfo.player.avatar}
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

                            
                              {
                                data.playerInfo.player.banned ? 
                                <Button loading={loading} text="Unban" textColor={"white"} bgColor={"green"} size={"small"} width={"full"} onClick={UnbanPlayer}/>
                                : <Button loading={loading} text="Ban" textColor={"white"} bgColor={"red"} size={"small"} width={"full"} onClick={BanPlayer}/>
                              }
                              
                              <Button text="Wallet" textColor={"white"} bgColor={"primary-focus"} size={"small"} width={"full"} onClick={() => setWalletModalOpen(true)}/>
                            </div>
                          {/* PLayer information */}
                          <div>
                            <p className="text-white">
                              {" "}
                              <span className="font-semibold mr-3">ID:</span>
                              {data.playerInfo.player.id}
                            </p>
                            <p className="text-white">
                              {" "}
                              <span className="font-semibold mr-3">
                                Status:
                              </span>
                              {data.playerInfo.player.banned ? (
                                <span className="text-red-900 italic">
                                  Banned
                                </span>
                              ) : (
                                <span className="text-green-600 italic">
                                  Active
                                </span>
                              )}
                            </p>
                            <p className="text-white">
                              {" "}
                              <span className="font-semibold mr-3">
                                Username:
                              </span>
                              {data.playerInfo.player.username}
                            </p>
                            <p className="text-white">
                              {" "}
                              <span className="font-semibold mr-3">
                                First name:
                              </span>
                              {data.playerInfo.player.firstName}
                            </p>
                            <p className="text-white">
                              {" "}
                              <span className="font-semibold mr-3">
                                Last name:
                              </span>
                              {data.playerInfo.player.lastName}
                            </p>
                            <p className="text-white">
                              {" "}
                              <span className="font-semibold mr-3">
                                Birth date:
                              </span>
                              {format(
                                new Date(data.playerInfo.player.birthDate)
                              )}
                            </p>
                            <p className="text-white">
                              {" "}
                              <span className="font-semibold mr-3">Email:</span>
                              {data.playerInfo.player.email}{" "}
                              {data.playerInfo.player.emailVerified ? (
                                <span className="text-green-600 italic">
                                  Verified
                                </span>
                              ) : (
                                <span className="text-yellow-500 italic">
                                  Unverified
                                </span>
                              )}
                            </p>
                            <p className="text-white">
                              {" "}
                              <span className="font-semibold mr-3">
                                Paypal:
                              </span>
                              {data.playerInfo.player.paypal ? (
                                data.playerInfo.player.paypal
                              ) : (
                                <span className="text-red-900 italic">
                                  Not Provided
                                </span>
                              )}
                            </p>
                            <p className="text-white">
                              {" "}
                              <span className="font-semibold mr-3">
                                Joined Gamingpills:
                              </span>
                              {format(
                                new Date(data.playerInfo.player.createdAt)
                              )}
                            </p>
                            <p className="text-white">
                              {" "}
                              <span className="font-semibold mr-3">
                                Last seen:
                              </span>
                              {moment(
                                data.playerInfo.player.lastSeen
                              ).fromNow()}
                            </p>
                            <p className="text-white">
                              {" "}
                              <span className="font-semibold mr-3">
                                Wallet balance:
                              </span>
                              <span className="font-bold">${data.playerInfo.player.Wallet.balance}</span>
                              
                            </p>
                            <div className="flex space-x-5 mt-3">
                              <p className="text-white text-sm">
                                {" "}
                                <span className="text-blue-800 font-semibold mr-1">
                                  PSN:
                                </span>
                                {data.playerInfo.player.psnId ? (
                                  data.playerInfo.player.psnId
                                ) : (
                                  <span className="text-gray-500 italic">
                                    Not Provided
                                  </span>
                                )}
                              </p>
                              <p className="text-white text-sm">
                                {" "}
                                <span className="text-green-800 font-semibold mr-1">
                                  XBOX gamertag:
                                </span>
                                {data.playerInfo.player.xboxId ? (
                                  data.playerInfo.player.xboxId
                                ) : (
                                  <span className="text-gray-500 italic">
                                    Not Provided
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          {/* Transactions */}
                          <div>
                          <p className="text-center text-white font-semibold text-base">Last 10 transactions</p>
                          <div className="bg-dark p-4 lg:p-8 rounded-xl w-full">
                            <div className="flex justify-center">
                              <div className="inline-block min-w-full shadow rounded-md overflow-hidden overflow-x-auto">
                                <table className="min-w-full leading-normal">
                                  <thead>
                                    <tr>
                                      <th className="px-5 py-3 border-b-2 bg-black border-black text-center text-xs font-semibold text-gray-100 uppercase tracking-wider">
                                        Type
                                      </th>
                                      <th className="px-5 py-3 border-b-2 bg-black border-black text-center text-xs font-semibold text-gray-100 uppercase tracking-wider">
                                        Date
                                      </th>
                                      <th className="px-5 py-3 border-b-2 bg-black border-black text-center text-xs font-semibold text-gray-100 uppercase tracking-wider">
                                        amount
                                      </th>
                                      <th className="px-5 py-3 border-b-2 bg-black border-black text-center text-xs font-semibold text-gray-100 uppercase tracking-wider">
                                        Status
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="text-white capitalize">
                                    {data.playerInfo.transactions.map(
                                      (transaction) => (
                                        <tr key={transaction.id}>
                                          <td className="px-2 py-2 border-b bg-black border-black text-sm">
                                            {transaction.type ==
                                              Type.Negative && (
                                              <p className="text-center text-red-500">
                                                - {transaction.description}
                                              </p>
                                            )}
                                            {transaction.type ==
                                              Type.Positive && (
                                              <p className="text-center text-green-500">
                                                + {transaction.description}
                                              </p>
                                            )}
                                          </td>
                                          <td className="border-b bg-black border-black text-sm text-center">
                                            <p className="whitespace-no-wrap">
                                              {format(
                                                new Date(transaction.createdAt)
                                              )}
                                            </p>
                                          </td>
                                          <td className="border-b bg-black border-black text-sm text-center">
                                            <p className="whitespace-no-wrap">
                                              $ {transaction.amount}
                                            </p>
                                          </td>
                                          <td className="border-b bg-black border-black text-xs text-center">
                                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                                              {transaction.status ==
                                                Status.Completed && (
                                                <span
                                                  aria-hidden
                                                  className="absolute inset-0 text-sm bg-green-700 opacity-50 rounded-md"
                                                ></span>
                                              )}
                                              {transaction.status ==
                                                Status.Pending && (
                                                <span
                                                  aria-hidden
                                                  className="absolute inset-0 text-sm bg-yellow-500 opacity-50 rounded-md"
                                                ></span>
                                              )}
                                              {transaction.status ==
                                                Status.Rejected && (
                                                <span
                                                  aria-hidden
                                                  className="absolute inset-0 text-sm bg-red-700 opacity-50 rounded-md"
                                                ></span>
                                              )}
                                              <span className="relative text-white">
                                                {transaction.status}
                                              </span>
                                            </span>
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          </div>
                          
                        </div>
                        {/* Challenges */}
                      <div>
                      <p className="text-center text-white font-semibold text-base">Last 10 challenges</p>
                        {data.playerInfo.challenges.length > 0 ? (
                          data.playerInfo.challenges.map((challenge) => (
                            <div
                              key={challenge.id}
                              className="flex justify-between w-full space-x-3 px-3 text-sm lg:text-base bg-dark rounded-md text-white py-3 items-center"
                            >
                              {challenge.status == Status.Active && (
                                <p className="text-green-600">ACTIVE</p>
                              )}
                              {challenge.status == Status.Disputed && (
                                <p className="text-yellow-600">DISPUTED</p>
                              )}
                              {challenge.status == Status.Finished && (
                                <p className="text-primary">FINISHED</p>
                              )}
                              <p>{challenge.id}</p>
                              <p>{challenge.bet}$</p>
                              <p>{moment(challenge.createdAt).fromNow()}</p>
                              <button
                                className="bg-primary p-2 mx-1 text-white rounded-md hover:bg-primary-focus"
                                onClick={() =>
                                  router.push(`/game/lobby/${challenge.id}`)
                                }
                              >
                                Go to lobby
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="p-5">
                            <p className="text-center text-white">No challenges yet</p>
                          </div>
                        )}
                      </div>
                      </div>
                      
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
