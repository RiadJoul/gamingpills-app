import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsExclamationTriangle, BsQuestionCircle } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";

interface Props {
  title: string;
  feedback: string;
  type: "error" | "success" | "confirmation";

  ctaText?: string;
  cancelText?: string;
  onClick?: () => void;
  loading?: boolean,

  show: boolean;
  close: () => void;
}

const FeedbackModal = (props: Props) => {
  const closeButtonRef = useRef(null);

  return (
    <Transition.Root show={props.show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={closeButtonRef}
        onClose={() => props.close()}
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
              <Dialog.Panel className="relative bg-black font-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                <div className="bg-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${props.type == "error" && "bg-red-100 pb-1"
                        } ${props.type == "success" && "bg-green-100"}`}
                    >
                      {props.type == "confirmation" && (
                        <BsQuestionCircle
                          className="h-6 w-6 text-primary-focus"
                          aria-hidden="true"
                        />
                      )}
                      {props.type == "error" && (
                        <BsExclamationTriangle
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      )}
                      {props.type == "success" && (
                        <FaCheck
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-white"
                      >
                        {props.title}
                      </Dialog.Title>

                      <div className="mt-2">
                        <p className="text-sm lg:text-base text-gray-100">
                          {props.feedback}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-dark px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse space-y-3 lg:space-y-0">

                  {props.ctaText && (
                    <button onClick={() => {
                      props.onClick();
                      props.close;
                    }}
                      type="button"

                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base lg:text-lg font-semibold text-white hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                      {props.loading ? (
                        <svg
                          role="status"
                          className={`w-6 h-6 mr-2 text-gray-200 animate-spin fill-dark`}
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      ) : (
                        props.ctaText
                      )}
                    </button>
                  )}
                  {props.cancelText && (
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base lg:text-lg font-semibold text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => props.close()}
                      ref={closeButtonRef}
                    >
                      {props.cancelText}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root >
  );
};

export default FeedbackModal;
