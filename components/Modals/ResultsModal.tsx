import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Challenge,
  Scores,
  useRespondToResultsMutation,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import Button from "../shared/Button";

interface Props {
  show: boolean;
  challenge: Challenge;
  results: Scores;
}

const ResultsModal = ({ show, challenge, results }: Props) => {
  const router = useRouter();
  const closeButtonRef = useRef(null);

  const [, respondToResults] = useRespondToResultsMutation();

  //responses
  const [errorField, setErrorField] = useState<string>(null);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const respond = async (accept: boolean) => {
    const response = await respondToResults({ id: challenge.id, accepted: accept });
    if (response.data?.respondToResults.errors) {
      setErrorField(response.data.respondToResults.errors[0].field);
      setErrorMessage(response.data.respondToResults.errors[0].message);
    }
    else {
      setTimeout(() => router.push("/game/lobby/" + challenge.id), 1000);
    }
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={closeButtonRef}
        onClose={() => { }}
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
              <Dialog.Panel className="relative bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                <div className="bg-dark font-primary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-white capitalize"
                      >
                        Results uploaded
                      </Dialog.Title>

                      <div className="mt-2">
                        <p className="text-base text-gray-100 capitalize">
                          You opponent uploaded the following results, do you
                          agree? if not a dispute will be opened and both
                          players will have to confirm the score by pictures :{" "}
                          <br />
                          <h3 className="text-center text-lg my-5">
                            {challenge.homePlayer.username}{" "}
                            <span className="text-2xl font-bold mx-8">
                              {results.homeScore} : {results.awayScore}{" "}
                            </span>
                            {challenge.awayPlayer.username}
                          </h3>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-dark px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center space-y-3 lg:space-y-0">
                  <button type="button"
                    onClick={() => respond(true)}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base lg:text-lg font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                        Accept
                        </button>
                        <button type="button"
                    onClick={() => respond(false)}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base lg:text-lg font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                        Decline
                        </button>
                  
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ResultsModal;
