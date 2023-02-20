import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAddFundsMutation } from "../../generated/graphql";
import FeedbackModal from "../Modals/FeedbackModal";

interface Props {
  amount: number;
  close: any;
}

const PaypalSDK = ({ amount, close }: Props) => {
  //PAYPAL Payment
  const router = useRouter();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  //TODO: make a testing api and a prod api
  // and hide this
  const CLIENT_ID =
    "AYCWg0aCcyF8OVT7oaXgeXQ4KoDiO_g93uRdF-aOFdBUjdvsnWF_6JgzoyQBVfAGyD0oXhPdaEqWfHYf";
  const initialOptions = {
    "client-id": CLIENT_ID,
    currency: "USD",
  };

  const createOrder = (
    data: Record<string, unknown>,
    actions: { order: any }
  ) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    });
  };
  const [, addFunds] = useAddFundsMutation();
  const onApprove = async () => {
    await addFunds({
      amount: amount
    });
    setSuccess(true);
    setTimeout(() => close(), 5000);
    router.push("/player/wallet");
  };

  const onCancel = async () => {
    setError(true);
    setTimeout(() => close(), 5000);
  };

  return (
    <>
      <FeedbackModal
        title={"Payment was not successfull"}
        feedback={"The Payment was not successfull, please try again!"}
        type={"error"}
        show={error}
        close={() => setError(false)}
      />

      <FeedbackModal
        title={"Payment successful!"}
        feedback={
          "You have completed your payment, funds will shortly be added to your account."
        }
        type={"success"}
        show={success}
        close={() => setSuccess(false)}
      />
      
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={() => onApprove()}
          onCancel={() => onCancel()}
          onError={() => onCancel()}
        />
      </PayPalScriptProvider>
    </>
  );
};
export default PaypalSDK;
