import React, { useState } from "react";
import Button from "../../components/Shared/Button";
import Input from "../../components/Shared/Input";
import PageHead from "../../components/Shared/PageHead";

import GamingpillsPoster from "../../components/Public/GamingpillsPoster";
import Error from "../../components/Shared/Error";

import { useSendResetPasswordEmailMutation } from "../../generated/graphql";
import Success from "../../components/Shared/Success";

const Password = () => {
  const [loading, setLoading] = useState<boolean>(false);
  //form
  const [email, setEmail] = useState<any>(null);
  //responses
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);
  const [, sendResetPasswordEmail] = useSendResetPasswordEmailMutation();

  const sendEmail = async () => {
    if (email == null) return null;
    setLoading(true);
    setErrorField(null);
    setErrorMessage(null);
    const response = await sendResetPasswordEmail({ email });
    if (response.data?.sendResetPasswordEmail.errors) {
      setErrorField(response.data.sendResetPasswordEmail.errors[0].field);
      setErrorMessage(response.data.sendResetPasswordEmail.errors[0].message);
    } else {
      setSucess(true);
    }
    setLoading(false);
  };

  return (
    <>
      <PageHead title="Reset Password" />
      <div className="min-h-screen flex">
        <GamingpillsPoster />

        <div className="flex w-full lg:w-1/2 justify-center items-center bg-dark">
          <div className="mt-8 sm:mx-auto w-full sm:w-4/6">
            <h2 className="mt-6 text-2xl lg:text-3xl font-extrabold text-center text-white">
              Reset Password
            </h2>
            <div className="px-4 py-8 sm:px-10">
              {!success && (
                <div className="space-y-3">
                  <div>
                    <Input
                      label="Email"
                      type="text"
                      placeholder="email"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setEmail(e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
              <div className="py-1">
                {errorField && (
                  <Error message={errorField} description={errorMessage} />
                )}
                {success && (
                  <Success
                    message={"email sent!"}
                    description="check you email inbox for further instructions"
                  />
                )}
              </div>
              {!success && (
                <div className="my-2">
                  <Button
                    text="Send Email"
                    bgColor="white"
                    size={"medium"}
                    textColor="black"
                    width="full"
                    onClick={() => sendEmail()}
                    loading={loading}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;