import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../../components/shared/Button";
import Input from "../../components/shared/Input";
import PageHead from "../../components/shared/PageHead";
import GamingpillsPoster from "../../components/Public/GamingpillsPoster";
import Success from "../../components/shared/Success";
import Error from "../../components/shared/Error";
import { useRegisterMutation } from "../../generated/graphql";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  //form
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date>(null);
  //responses
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);

  const [, register] = useRegisterMutation();

  const RegisterUser = async () => {
    //TODO:client-side validation
    
    //TODO: ISSUE password does not work if he has symbols in it 
    //this is an issue in the backend with the regex
    if (birthDate == null) {
      setErrorField('Birth date');
      setErrorMessage('not a valid birth date');
      return;
    };
    setLoading(true);
    setErrorField(null);
    setErrorMessage(null);
    const response = await register({
      firstName,
      lastName,
      username,
      email,
      password,
      birthDate,
    });
    if (response.data?.register.errors) {
      setErrorField(response.data.register.errors[0].field);
      setErrorMessage(response.data.register.errors[0].message);
    } else {
      setSucess(true);
      setTimeout(() => router.push("/player/feed"), 1000);
    }
    setLoading(false);
  };

  return (
    <>
      <PageHead title="Sign up" />
      <div className="min-h-screen flex">
        <GamingpillsPoster />
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-dark">
          <div className="mt-8 sm:mx-auto w-full sm:w-4/6">
            <h2 className="mt-6 text-2xl lg:text-3xl font-extrabold text-center text-white">
              Sign up
            </h2>
            {!success && (
              <div className="px-4 py-8 sm:px-10">
                <div className="space-y-2">
                  <div>
                    <Input
                      label="First name"
                      type="text"
                      placeholder="First name"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setFirstName(e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Last name"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setLastName(e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Input
                      label="Username"
                      type="text"
                      placeholder="Username"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setUsername(e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Input
                      label="Email"
                      type="text"
                      placeholder="Email"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setEmail(e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Input
                      label="Password"
                      type="password"
                      placeholder="password"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setPassword(e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Input
                      label="Date of birth"
                      type="date"
                      placeholder="Date of birth"
                      onChange={(e: React.ChangeEvent<any>) =>
                        setBirthDate(e.target.value)
                      }
                    />
                  </div>
                  {/* TODO: link TOS here */}
                  <p className="text-white text-sm">
                    By Signing up, you agree to{" "}
                    <span className="text-primary">Gamingpills</span>'s Terms of
                    Service and Privacy Policy
                  </p>
                </div>
                <div className="my-5">
                  {errorField && (
                    <Error message={errorField} description={errorMessage} />
                  )}
                  <Button
                    text="Sign up"
                    bgColor="white"
                    textColor="black"
                    width="full"
                    size={"medium"}
                    onClick={() => RegisterUser()}
                    loading={loading}
                  />
                  <div className="w-full relative my-1 flex items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-100">or</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                  </div>
                  <Button
                    text="Login"
                    bgColor="primary"
                    width="full"
                    size={"medium"}
                    textColor="white"
                    onClick={() => {
                      router.push("/auth/login");
                    }}
                  />
                </div>
              </div>
            )}

            

            <div className="py-1">
              {success && (
                <Success
                  message={"Signed in successfully!"}
                  description="Redirecting you..."
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
