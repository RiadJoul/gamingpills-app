import { Transition, Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment, useRef, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { useWithdrawMutation } from "../../generated/graphql";
import Button from "../shared/Button";
import Info from "../shared/Info";
import FeedbackModal from "./FeedbackModal";

interface Props {
  ctaText?: string;
  cancelText: string;
  onClick: () => void;

  show: boolean;
  close: () => void;
}

const WithdrawModal = (props: Props) => {
  const router = useRouter();
  const [amount, setAmount] = useState<number>();

  //responses
  const [loading, setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);

  //graphql
  const [, withdraw] = useWithdrawMutation();

  const withdrawFunds = async () => {
    if (amount == null) return;
    setLoading(true);
    setErrorField(null);
    setErrorMessage(null);
    const response = await withdraw({
      amount: amount,
    });
    if (response.data?.withdraw.errors) {
      setErrorField(response.data.withdraw.errors[0].field);
      setErrorMessage(response.data.withdraw.errors[0].message);
    } else {
      setSucess(true);
      setTimeout(() => router.push("/player/wallet"), 1000);
    }
    setLoading(false);
  };
  const closeButtonRef = useRef(null);
  return (
    <>
      <FeedbackModal
        title={"Success"}
        feedback={
          "Your withdraw will be in your account in 2-5 business days"
        }
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
        onClick={() => { }}
      />
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

          <div className="fixed z-10 font-primary inset-0 overflow-y-auto">
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
                  <div className="bg-dark text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-base lg:text-lg text-center">
                        <span className="flex justify-center">
                          <GiTakeMyMoney className="text-6xl text-primary" />
                        </span>
                        Withdraw Funds
                      </h3>
                      <div className="flex justify-center my-1">
                        <Info
                          bgColor="black"
                          info={"The minimum amount to withdraw is 10$"}
                        />
                      </div>
                      <div className="space-y-2 my-5">
                        <div className="col-span-6">
                          <label className="block text-left ml-1 text-gray-100 text-sm font-bold mb-2">
                            Amount to withdraw
                          </label>
                          <input
                            className="placeholder:text-slate-900 block text-black bg-gray-200 w-full rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none sm:text-sm"
                            placeholder="10.00"
                            type="text"
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            onChange={(e) =>
                              setAmount(parseInt(e.target.value))
                            }
                          />
                        </div>
                      </div>

                      <div className="flex flex-col items-center space-y-2 my-2">
                        <Button
                          text={props.ctaText}
                          textColor={"white"}
                          bgColor={"primary"}
                          size={"medium"}
                          width={"most"}
                          loading={loading}
                          onClick={() => withdrawFunds()}
                        />
                        <Button
                          text={props.cancelText}
                          textColor={"white"}
                          bgColor={"black"}
                          size={"medium"}
                          width={"most"}
                          onClick={() => props.close()}
                        />
                      </div>
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

export default WithdrawModal;
