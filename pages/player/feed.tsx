import React, { useEffect, useState } from "react";
import Games from "../../components/Games/Games";
import FooterNavigation from "../../components/Navigation/FooterNavigation";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import OnlinePlayers from "../../components/OnlinePlayers/OnlineUsers";
import PageHead from "../../components/shared/PageHead";
import Challenges from "../../components/Challenge/Challenges";
import { useFeedQuery, User, useSendVerificationCodeMutation } from "../../generated/graphql";
import useAuth from "../../services/useAuth";
import Alert from "../../components/shared/Alert";
import FeedbackModal from "../../components/Modals/FeedbackModal";
import Chat from "../../components/Chat/Chat";
import { useIsAuth } from "../../services/useIsAuth";
import MyChallenges from "../../components/Challenge/MyChallenges";
import Loading from "../../components/shared/Loading";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import Image from "next/image";



const Feed = () => {
  useIsAuth();

  //graphql
  const [result, reexecuteQuery] = useFeedQuery();
  const [, sendVerification] = useSendVerificationCodeMutation();
  //@ts-ignore
  const { user }: User = useAuth();
  const { data, fetching } = result;

  //responses
  const [loading, setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => reexecuteQuery(), 5000);



    return () => {
      clearInterval(interval);
    };
  }, [result]);

  const sendEmail = async () => {
    setLoading(true);
    setErrorField(null);
    setErrorMessage(null);
    const response = await sendVerification();
    if (response.data?.sendVerificationCode.errors) {
      setErrorField(response.data.sendVerificationCode.errors[0].field);
      setErrorMessage(response.data.sendVerificationCode.errors[0].message);
    } else {
      setSucess(true);
    }
    setLoading(false);
  };

  return user && (
    <>
      <FeedbackModal
        title={"Success"}
        feedback={'email has been sent to verify your account'}
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
      />


      <PageHead title="Feed" />
      <TopNavigation />
      <main className="min-h-screen bg-black grid grid-cols-12">
        <aside className="hidden md:flex flex-col mt-7 col-span-2 items-end text-white shadow mb-5">
          <SideNavigation />
        </aside>
        <div className="col-span-12 md:col-span-6 mt-5">
          <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
            <div className="space-y-2">
              {
                fetching && <Loading />
              }
              {
                !fetching && data &&
                <>
                  {user && user.emailVerified === false && <div className="mt-2.5">
                    <Alert text={"your email is not verified yet"} ctaText={"verify email"} cta={() => sendEmail()} loading={loading} />
                  </div>}
                  {
                    user.banned &&
                    <div className="mt-2.5">
                      <div className="flex justify-between px-5 py-2 items-center rounded-md bg-red-800 capitalize text-sm lg:text-base">
                        <p className="text-white">Your Account has been banned</p> <span className="text-gray-300 text-sm">Contact support for more information</span>


                      </div>
                    </div>
                  }
                  <OnlinePlayers users={data.feed.onlineUsers} />
                  <Games games={data.feed.games} />
                  <MyChallenges challenges={data.feed.myChallenges} />
                  <Challenges games={data.feed.games} challenges={data.feed.challenges} />
                 

                </>
              }
            </div>
          </div>
          <FooterNavigation />
        </div>
        
          <Chat />
        
      </main>
      
    </>
  );
};

export default Feed;