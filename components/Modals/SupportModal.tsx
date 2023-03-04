import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gamingpills from "../../public/images/logo/gamingpills.svg";
import Button from "../Shared/Button";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";
interface Props {
  show: boolean;
  close: any;
}

const SupportModal = ({ show, close }: Props) => {
  const closeButtonRef = useRef(null);
  const [estimated, setEstimated] = useState<number>();
  useEffect(() => {
    setEstimated(Math.floor(Math.random() * 8) + 1);
  }, []);
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={closeButtonRef}
        onClose={close}
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
                <div className="flex flex-col space-y-3 p-5">
                  <div>
                    <Image
                      className="rounded-full"
                      src={gamingpills}
                      width={150}
                      height={50}
                    />
                    <h3 className="text-primary font-bold text-2xl">
                      Gamingpills
                    </h3>
                    <h5 className="text-white text-center capitalize font-semibold text-sm lg:text-base my-3">
                      Estimated response time:{" "}
                      <span className="font-bold text-green-600">
                        {estimated} minutes
                      </span>
                    </h5>
                    <p className="text-white text-center capitalize font-semibold text-sm lg:text-sm my-3">You can contact us through our email or discord</p>
                  </div>

                  <Button
                    text={"Email"}
                    icon={IoMailOpenOutline}
                    textColor={"black"}
                    bgColor={"white"}
                    size={"medium"}
                    width={"full"}
                    onClick={() => {}}
                  />
                  <Button
                    text={"Discord"}
                    icon={FaDiscord}
                    textColor={"black"}
                    bgColor={"white"}
                    size={"medium"}
                    width={"full"}
                    onClick={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SupportModal;
