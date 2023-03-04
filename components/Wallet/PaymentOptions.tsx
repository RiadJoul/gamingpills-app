import { RadioGroup } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { options } from "../../services/server";
import CheckoutModal from "../Modals/CheckoutModal";
import FeedbackModal from "../Modals/FeedbackModal";
import Button from "../Shared/Button";
import Info from "../Shared/Info";



const PaymentOptions = () => {

  const minimum = 5;
  const maximum = 200;

  const [amountSelected, setAmountSelected] = useState(minimum);
  const [optionSelected, setOptionSelected] = useState(options[0]);
  const [error, setError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);


  const pay = () => {
    if (amountSelected < minimum || amountSelected > maximum) {
      setError(true)
      return;
    }
    setShowModal(true)
  }

  useEffect(() => {
    if (amountSelected == null) {
      setAmountSelected(minimum)
    }
  }, [amountSelected])

  return (
    <>
      <FeedbackModal
        title={"Amount not valid"}
        feedback={`The minimum amount you can buy is ${minimum}$ and the maximum is ${maximum}$`}
        type={"error"}
        show={error}
        cancelText={'close'}
        close={() => setError(false)}
      />
      <CheckoutModal show={showModal} close={() => setShowModal(false)} amount={amountSelected} />
      <div className="bg-dark p-4 lg:p-8 rounded-xl w-full space-y-5">
        <div className="w-full">
          <h1 className="text-base mb-2 text-white font-semibold uppercase">
            Payment amount:
          </h1>

          <div className="flex justify-center items-center text-8xl text-white bg-dark font-semibold text-center">
            <h1>$</h1>
            <input type="text" maxLength={4} placeholder={amountSelected ? amountSelected.toString() : minimum.toString()} onChange={(e) => setAmountSelected(parseInt(e.target.value))} onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }} className="bg-dark outline-0 w-full text-center py-5 font-semibold" />
          </div>
        </div>
        <div className="w-full">
          <h1 className="mb-2 text-white font-semibold uppercase">
            Payment options:
          </h1>
          <RadioGroup value={optionSelected} onChange={setOptionSelected}>
            <div className="space-y-2">
              {options.map((option) => (
                <RadioGroup.Option
                  key={option.id}
                  value={option}
                  className={({ checked }) =>
                    `
                  ${checked
                      ? `bg-primary-focus bg-opacity-45 text-white`
                      : " bg-gray-200"
                    }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="shrink-0 text-white">
                            <option.icon
                              className={`text-3xl ${checked ? "text-white" : "text-gray-900"
                                }`}
                            />
                          </div>
                          <div className="text-sm lg:text-lg">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${checked ? "text-white" : "text-gray-900"
                                }`}
                            >
                              {option.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${checked ? "text-sky-100" : "text-gray-500"
                                }`}
                            ></RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Info bgColor="black"
            info="If you do not have a PayPal account, PayPal offers a guest checkout option
      where you can pay with your credit/debit card or a third party payment
      processor"
          />
        </div>
        <div className="flex justify-center">
          <Button
            text={"PAY"}
            textColor={"black"}
            bgColor={"white"}
            icon={AiOutlineLock}
            size={"medium"}
            width={"most"}
            onClick={() => pay()}
          />
        </div>
      </div>
    </>
  );
};

function CheckIcon(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PaymentOptions;
