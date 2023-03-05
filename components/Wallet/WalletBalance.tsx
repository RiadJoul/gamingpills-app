
import React, { useState } from "react";
import { RiHandCoinLine } from "react-icons/ri";
import { User } from "../../generated/graphql";
import useAuth from "../../services/useAuth";
import WithdrawModal from "../Modals/WithdrawModal";
import Button from "../shared/Button";
import Info from "../shared/Info";
import Loading from "../shared/Loading";

const WalletBalance = () => {
  const [showWithdrawModal, setWithdrawModal] = useState(false);

  //@ts-ignore
  const { user }: User = useAuth();

  return (
    <>
      {!user ? (
        <Loading />
      ) : (
        <>
          <WithdrawModal
            ctaText={"Confirm"}
            cancelText={"Cancel"}
            onClick={() => {}}
            show={showWithdrawModal}
            close={() => setWithdrawModal(false)}
          />
          <h1 className="text-base mb-2 md:text-lg text-white font-semibold uppercase">
            Balance:
          </h1>
          <div className="bg-dark p-4 lg:p-8 rounded-lg w-full space-y-5">
            <div className="flex justify-center w-full">
              <div className="bg-opacity-20 rounded-xl px-10 py-5">
                <h1 className="text-white font-semibold text-5xl">$ {user.Wallet.balance}.00</h1>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                text={"Withdraw"}
                textColor={"black"}
                bgColor={"white"}
                size={"medium"}
                icon={RiHandCoinLine}
                width={"most"}
                onClick={() => setWithdrawModal(true)}
              />
            </div>
            <div className="mb-2">
              <Info
                bgColor="black"
                info={
                  "NOTE: The data that you provide will be handled exclusively by PayPal no information of your accounts and cards will be stored in our system"
                }
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WalletBalance;
