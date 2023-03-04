import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";
import { RiGamepadLine } from "react-icons/ri";
import PaypalSDK from "../CheckoutProcessors/PaypalSDK";
import Loading from "../Shared/Loading";

interface Props {
  amount: number;
  show: boolean;
  close: any;
}

const CheckoutModal = ({ show, amount, close }: Props) => {
  const closeButtonRef = useRef(null);
  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 3000);
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={closeButtonRef}
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
              <Dialog.Panel
                className={
                  "font-primary relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full " +
                  (!loading && "bg-gray-200 p-10")
                }
              >
                {loading ? (
                  <div className="p-4 w-full text-center rounded-md border shadow-md bg-white border-white">
                  <div className="my-5 flex items-center justify-center lg:my-10">
                    <div className="text-center text-white space-y-3">
                      <div className="flex justify-center space-x-10 text-primary-focus text-4xl lg:text-5xl animate-bounce">
                        <RiGamepadLine />
                        <RiGamepadLine />
                        <RiGamepadLine />
                      </div>
                    </div>
                  </div>
                </div>
                ) : (
                  <PaypalSDK amount={amount} close={close} />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default CheckoutModal;
