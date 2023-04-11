import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useCreateGameMutation } from "../../generated/graphql";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Success from "../shared/Success";
import Error from "../shared/Error";

export const CreateGameModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [gameName, setGameName] = useState<string>();
  const [gameModeName, setGameModeName] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [preview, setPreview] = useState<any>();

  //graphql
  const [, createGame] = useCreateGameMutation();

  //responses
  const [loading, setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const AddGame = async () => {
    if(!gameName || !gameModeName) {
      setErrorField("Error");
      setErrorMessage("Please provide game name and game mode name");
      setLoading(false);
      return;
    }
    if (isEmptyOrSpaces(gameName) || isEmptyOrSpaces(gameModeName)) {
      setErrorField("Error");
      setErrorMessage("Please provide game name and game mode name");
      setLoading(false);
      return;
    }
    setLoading(true);
    setErrorField(null);
    setErrorMessage(null);

    const response = await createGame({
      gameName: gameName,
      gameModeName: gameModeName,
      file: selectedFile,
    });

    console.log(selectedFile)
    if (response.data?.createGame.errors) {
      setErrorField(response.data.createGame.errors[0].field);
      setErrorMessage(response.data.createGame.errors[0].message);
    } else {
      setSucess(true);
    }
    setLoading(false);
    close();
  };

  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  return (
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
                <div className="bg-dark rounded-lg py-10 px-3 space-y-2">
                  <Input
                    label="Game name"
                    type={"text"}
                    placeholder={"name"}
                    onChange={(e) => setGameName(e.target.value)}
                  />
                  <Input
                    label="Game mode name"
                    type={"text"}
                    placeholder={"name"}
                    onChange={(e) => setGameModeName(e.target.value)}
                  />
                  {errorField && (
                    <Error message={errorField} description={errorMessage} />
                  )}
                  {success && <Success message={"success"} />}
                  {selectedFile &&
                  <img
                    src={preview}
                    width={120}
                    height={120}
                    className="shadow-lg rounded-md"
                  />
                }
                <div className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-primary bg-dark p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <label htmlFor="dropzone-file">
                    <h2 className="mt-4 text-xl font-medium text-gray-200 tracking-wide">
                      Cover
                    </h2>

                    <p className="mt-2 text-gray-400 tracking-wide">
                      Upload the game cover file PNG, JPG or GIF.{" "}
                    </p>
                  </label>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={onSelectFile}
                  />
                </div>
                {selectedFile && (
                  <Button
                    text={"Save"}
                    textColor={"black"}
                    bgColor={"white"}
                    size={"medium"}
                    width={"most"}
                    loading={loading}
                    onClick={() => AddGame()}
                  />
                )}
                </div>
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
