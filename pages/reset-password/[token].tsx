import React, { useState } from "react";
import Button from "../../components/Shared/Button";
import Input from "../../components/Shared/Input";
import PageHead from "../../components/Shared/PageHead";

import GamingpillsPoster from "../../components/Public/GamingpillsPoster";
import Error from "../../components/Shared/Error";

import { useResetPasswordMutation } from "../../generated/graphql";
import Success from "../../components/Shared/Success";
import { useRouter } from "next/router";


const ResetPassword = () => {
    const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  //form
  const [newPassword, setNewPassword] = useState<string>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>(null);
  //responses
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);
  const [, resetPassword] = useResetPasswordMutation();

  const { token } = router.query;


  const reset = async () => {
    if (newPassword == null || confirmPassword == null) return null;
    setLoading(true);
    setErrorField(null);
    setErrorMessage(null);
    
    const response = await resetPassword({token,newPassword,confirmPassword});
    
    if (response.data?.resetPassword.errors) {
      setErrorField(response.data.resetPassword.errors[0].field);
      setErrorMessage(response.data.resetPassword.errors[0].message);
    } else {
      setSucess(true);
      setTimeout(() => router.push("/auth/login"), 1000);
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
                      label="New Password"
                      type="password"
                      placeholder="password"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setNewPassword(e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Input
                      label="Confirm Password"
                      type="password"
                      placeholder="password"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setConfirmPassword(e.target.value)
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
                    message={"successfully"}
                    description="your password has been changed please login"
                  />
                )}
              </div>
              {!success && (
                <div className="my-2">
                  <Button
                    text="Confirm"
                    bgColor="white"
                    size={"medium"}
                    textColor="black"
                    width="full"
                    onClick={() => reset()}
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

export default ResetPassword;