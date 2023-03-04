import React, { useEffect, useState } from "react";
import PageHead from "../../components/Shared/PageHead";
import { useVerifyEmailMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import Loading from "../../components/Shared/Loading";
import {BsCheckCircle} from "react-icons/bs"
import { MdErrorOutline } from "react-icons/md";

const Verify = () => {
    const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  //responses
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);
  const [,verifyEmail] = useVerifyEmailMutation();
  
  const { token } = router.query;
  
  const variable = {
    token: typeof token === "string" ? token : null,
  };

  const isTokenValid = async () => {
    setLoading(true);
    const response = await verifyEmail(variable);
    if (response.data?.verifyEmail.errors) {
        setErrorField(response.data.verifyEmail.errors[0].field);
        setErrorMessage(response.data.verifyEmail.errors[0].message);
    } else {
      setSucess(true);
      setTimeout(() => router.push("/player/feed"), 3000);
    }
    setLoading(false);
  }

  useEffect(() => {
    if(token) isTokenValid();
  },[token])

  return (
    <>
      <PageHead title="Verify Email" />
 
    <main className="bg-black">
        <div className="flex flex-col space-y-5 items-center justify-center h-screen">
            <h1 className="text-white text-xl lg:text-3xl">Email verification</h1>
            <div className="lg:w-1/2 w-full px-5">
                {
                    !loading ? 
                <div className="flex justify-center space-x-4 bg-dark rounded-md p-10 text-center capitalize">
                {
                    success && <>
                    <BsCheckCircle className="text-3xl text-green-600"/>
                    <h1 className="text-white text-lg lg:text-2xl">Your Email has been verified successfully <br /> <span className="text-base lg:text-xl">You can close this window</span></h1>
                    </>
                }

                {
                    errorField && <>
                    <MdErrorOutline className="text-6xl text-red-600"/>
                    <h1 className="text-white text-lg lg:text-3xl">{errorField} <br /> <span className="text-base lg:text-xl">{errorMessage}</span></h1>
                    </>
                }
                
                </div> : <Loading/>
                }
            </div>
            
        </div>
        
    </main>
      
    </>
  );
};

export default Verify;