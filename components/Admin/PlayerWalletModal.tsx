import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CgRemoveR } from "react-icons/cg";
import { MdOutlineAddBox } from "react-icons/md";
import {
  useDeductWalletMutation,
  useFundWalletMutation,
} from "../../generated/graphql";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Success from "../shared/Success";
import Error from "../shared/Error";


export const PlayerWalletModal = ({
  playerId,
  isOpen,
  close,
}: {
  playerId: string;
  isOpen: boolean;
  close: () => void;
}) => {
  const [amount, setAmount] = useState<number>();
  //graphql
  const [, addFunds] = useFundWalletMutation();
  const [, deductWallet] = useDeductWalletMutation();

  //responses
  const [loading, setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);

  const AddFunds = async () => {
    if (!amount || amount == 0) return;
    setLoading(true);
    const response = await addFunds({
      userId: playerId,
      amount: amount,
    });
    if (response.data?.fundWallet.errors) {
      setErrorField(response.data.fundWallet.errors[0].field);
      setErrorMessage(response.data.fundWallet.errors[0].message);
    } else {
      setSucess(true);
    }
    setLoading(false);
  };

  const DeductWallet = async () => {
     if (!amount || amount == 0) return;
    setLoading(true);
    const response = await deductWallet({
      userId: playerId,
      amount: amount,
    });
    if (response.data?.deductWallet.errors) {
      setErrorField(response.data.deductWallet.errors[0].field);
      setErrorMessage(response.data.deductWallet.errors[0].message);
    } else {
      setSucess(true);
    }
    setLoading(false);
  };

  return (
    <>
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
                  {playerId && (
                    <>
                      <div className="bg-dark lg:text-lg text-base p-5 space-y-4">
                        <p className="text-white lg:text-lg text-sm uppercase ml-1 font-semibold">
                          player id: {playerId}
                        </p>

                        <Input
                          label="Amount in $"
                          type={"text"}
                          placeholder={"Amount"}
                          onChange={(e) => setAmount(parseInt(e.target.value))}
                          onKeyDown={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                        {errorField && (
                          <Error
                            message={errorField}
                            description={errorMessage}
                          />
                        )}
                        {success && <Success message={"success"} />}
                        <div className="flex space-x-2">
                          <Button
                            icon={MdOutlineAddBox}
                            text="Add"
                            textColor={"white"}
                            loading={loading}
                            bgColor={"green"}
                            size={"small"}
                            width={"full"}
                            onClick={AddFunds}
                          />
                          <Button
                            icon={CgRemoveR}
                            text="Remove"
                            textColor={"white"}
                            loading={loading}
                            bgColor={"red"}
                            size={"small"}
                            width={"full"}
                            onClick={DeductWallet}
                          />
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
