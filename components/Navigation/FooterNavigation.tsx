import React, { useState } from "react";
import FooterItem from "./FooterItem";
import { BsSearch, BsChatLeftText } from "react-icons/bs";
import { CgPill } from "react-icons/cg";
import { FiPlusSquare } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import ChallengeModal from "../Challenge/ChallengeModal";
import Link from "next/link";
import MobileChat from "../Chat/MobileChat";

const FooterNavigation = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isChatOpen,setIsChatOpen] = useState<boolean>(false);
  return (
    <>
      {isChatOpen && <MobileChat isOpen={isChatOpen} close={() => setIsChatOpen(false)}/>}
      <ChallengeModal show={showModal} close={() => setShowModal(false)} />
      <div className="w-full">
        <section className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-dark shadow">
          <section className="block fixed inset-x-0 bottom-0 z-10 bg-dark shadow">
            <div className="flex justify-between">
              <Link href={"/player/feed"}>
                <FooterItem title={"Feed"} icon={BsSearch} />
              </Link>
              <FooterItem
                title={"Chat"}
                icon={BsChatLeftText}
                onClick={() => setIsChatOpen(true)}
              />
              <FooterItem
                title={"Challenge"}
                icon={FiPlusSquare}
                onClick={() => {
                  setShowModal(true);
                }}
              />
              <Link href={"/player/matches"}>
                <FooterItem title={"Matches"} icon={CgPill} />
              </Link>
              <Link href={"/player/wallet"}>
                <FooterItem title={"Wallet"} icon={IoWalletOutline} />
              </Link>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default FooterNavigation;
