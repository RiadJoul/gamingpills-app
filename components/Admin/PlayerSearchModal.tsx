import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSearchPlayerQuery } from "../../generated/graphql";
import Button from "../shared/Button";
import Input from "../shared/Input";
import NoData from "../shared/NoData";
import { PlayerCard } from "./PlayerCard";

export const PlayerSearchModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [username, setUsername] = useState<string>();
  //graphql
  const [result, reexecuteQuery] = useSearchPlayerQuery({
    variables: { username: username },
    pause: true,
  });

  const search = () => {
    reexecuteQuery();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

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
                    label=""
                    type={"text"}
                    placeholder={"Username"}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="ml-1">
                    <Button
                      text="Search"
                      textColor={"white"}
                      bgColor={"primary"}
                      size={"small"}
                      width={"xmin"}
                      onClick={() => search()}
                    />
                  </div>
                  {result.data && result.data.searchPlayer.length > 0 ? (
                    result.data.searchPlayer.map((player, index) => (
                      <PlayerCard key={index} player={player} />
                    ))
                  ) : (
                    <NoData title={"No Data"} />
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
