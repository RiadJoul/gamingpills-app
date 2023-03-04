
import React, { useState } from "react";
import { RiHandCoinLine } from "react-icons/ri";
import { useWalletQuery } from "../../generated/graphql";
import WithdrawModal from "../Modals/WithdrawModal";
import Button from "../Shared/Button";
import Info from "../Shared/Info";
import Loading from "../Shared/Loading";

const WalletBalance = () => {
  const [showWithdrawModal, setWithdrawModal] = useState(false);

  const [result] = useWalletQuery();

  const { data, fetching } = result;
  return (
    <>
      {fetching ? (
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
                <h1 className="text-white font-semibold text-5xl">$ {data.wallet.balance}.00</h1>
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
