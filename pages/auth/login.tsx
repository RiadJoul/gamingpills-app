import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "../../components/Shared/Button";
import Input from "../../components/Shared/Input";
import PageHead from "../../components/Shared/PageHead";

import GamingpillsPoster from "../../components/Public/GamingpillsPoster";
import Error from "../../components/Shared/Error";

import { useLoginMutation } from "../../generated/graphql";
import Success from "../../components/Shared/Success";


const Login = () => {
  
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  //form
  const [username, setUsername] = useState<any>(null);
  const [password, setPassword] = useState<any>(null);
  //responses
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);
  const [, login] = useLoginMutation();

  const AuthenticateUser = async () => {
    if (username == null || password == null) return null;
    setLoading(true);
    setErrorField(null);
    setErrorMessage(null);
    const response = await login({ username, password });
    if (response.data?.login.id) {
      localStorage.setItem("id",response.data.login.id)
      setSucess(true);
      setTimeout(() => router.push("/player/feed"), 1000);
    } else {
      setErrorField("Error");
      setErrorMessage("username or password is incorrect");
    }
    setLoading(false);
  };

  return (
    <>
      <PageHead title="Login" />
      <div className="min-h-screen flex">
        <GamingpillsPoster />
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-dark">
          <div className="mt-8 sm:mx-auto w-full sm:w-4/6">
            <h2 className="mt-6 text-2xl lg:text-3xl font-extrabold text-center text-white">
              Sign in to your account
            </h2>
            <div className="px-4 py-8 sm:px-10">
              {!success && (
                <div className="space-y-3">
                  <div>
                    <Input
                      
                      type="text"
                      placeholder="Username"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setUsername(e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Input
                     
                      type="password"
                      placeholder="Password"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setPassword(e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
              {
                !success &&
              <div className="my-2">
                <div className="text-sm">
                  <a onClick={() => {
                      router.push("/auth/password");
                    }} className="text-sm cursor-pointer font-medium text-primary">
                    Forgot your password?
                  </a>
                </div>
              </div>
              }
              <div className="py-1">
                {errorField && (
                  <Error message={errorField} description={errorMessage} />
                )}
                {success && (
                  <Success
                    message={"Signed in successfully!"}
                    description="Redirecting you..."
                  />
                )}
              </div>
              {!success && (
                <div className="my-2">
                  <Button
                    text="Login"
                    bgColor="white"
                    size={"medium"}
                    textColor="black"
                    width="full"
                    onClick={() => AuthenticateUser()}
                    loading={loading}
                  />
                  <div className="w-full relative my-1 flex items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-100">or</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                  </div>
                  <Button
                    text="Sign up"
                    bgColor="primary"
                    size={"medium"}
                    textColor="white"
                    width="full"
                    onClick={() => {
                      router.push("/auth/signup");
                    }}
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

export default Login;
