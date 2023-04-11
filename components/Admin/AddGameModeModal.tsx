import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BsListUl } from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import { Game, useCreateGameModeMutation, useDeleteGameModeMutation, useDeleteGameMutation } from "../../generated/graphql";
import FeedbackModal from "../Modals/FeedbackModal";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Success from "../shared/Success";

export const AddGameModeModal = ({
  game,
  isOpen,
  close,
}: {
  game: Game;
  isOpen: boolean;
  close: () => void;
}) => {
  const [gameModeName, setGameModeName] = useState<string>();

  //graphql
  const [,deleteGameMode] = useDeleteGameModeMutation();
  const [,addGameMode] = useCreateGameModeMutation();
  //responses
  const [loading, setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);
  

  const DeleteGameMode = async (id:number) => {
    setLoading(true);
    setErrorField(null);
    setErrorMessage(null);
    const response = await deleteGameMode({ id: id});
    if (response.data?.deleteGameMode.errors) {
      setErrorField(response.data.deleteGameMode.errors[0].field);
      setErrorMessage(response.data.deleteGameMode.errors[0].message);
    } else {
      setSucess(true);
    }
    setLoading(false);
  }

  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  const AddGameMode = async () => {
    if(!gameModeName || isEmptyOrSpaces(gameModeName)) {
      setErrorField("Error");
      setErrorMessage("Please provide game mode name");
      setLoading(false);
      return;
    }
    setLoading(true);
    setErrorField(null);
    setErrorMessage(null);
    const response = await addGameMode({
      gameId: game.id,
      gameModeName: gameModeName
    });
    if (response.data?.createGameMode.errors) {
      setErrorField(response.data.createGameMode.errors[0].field);
      setErrorMessage(response.data.createGameMode.errors[0].message);
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
        close={() => setSucess(false)}
      />

      <FeedbackModal
        title={errorField}
        feedback={errorMessage}
        type={"error"}
        cancelText={"Close"}
        show={errorField ? true : false}
        close={() => setErrorField(null)}
      />
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

          <div className="fixed z-10 inset-0 overflow-y-auto text-xs lg:text-base">
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
                <Dialog.Panel className="relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                  <div className="bg-dark rounded-lg py-5 px-3 space-y-2">
                    <p className="text-white text-center lg:text-xl text-sm uppercase font-semibold">
                      {game.name}
                    </p>
                    {game.gameModes.map((mode) => (
                      <div className="flex justify-start items-center text-white hover:bg-black rounded-md px-2 py-2 my-2">
                        <span className="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                        <div className="flex-grow font-medium px-2">
                          {mode.name}
                        </div>
                        <div onClick={() => DeleteGameMode(mode.id)} className="text-lg font-bold text-red-600 cursor-pointer">
                          <MdBlock />
                        </div>
                      </div>
                    ))}
                    <Input
                      label="Add game mode"
                      type={"text"}
                      placeholder={"mode name"}
                      onChange={(e) => setGameModeName(e.target.value)}
                    />
                    <div className="ml-1 py-4">
                      <Button
                        text={"Confirm"}
                        textColor={"black"}
                        bgColor={"white"}
                        size={"medium"}
                        width={"full"}
                        loading={loading}
                        onClick={() => AddGameMode()}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
