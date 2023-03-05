import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FooterNavigation from "../../components/Navigation/FooterNavigation";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import Button from "../../components/shared/Button";
import PageHead from "../../components/shared/PageHead";
import Input from "../../components/shared/Input";
import {
  useChangePasswordMutation,
  useUpdateUserMutation,
} from "../../generated/graphql";
import FeedbackModal from "../../components/Modals/FeedbackModal";
import ImageEditor from "../../components/Account/ImageEditor";
import Chat from "../../components/Chat/Chat";
import { useIsAuth } from "../../services/useIsAuth";
import useAuth from "../../services/useAuth";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Account = () => {
  useIsAuth();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [psnId, setPsnId] = useState<string>("");
  const [xboxId, setXboxId] = useState<string>("");
  const [paypal, setPaypal] = useState<string>("");
  //password
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  //graphql
  const [, updateUser] = useUpdateUserMutation();
  const [, changePassword] = useChangePasswordMutation();

  //responses
  const [loading, setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSucess] = useState<boolean>(false);

  //@ts-ignore
  const {user}:User = useAuth();
  
  const update = async () => {
    setErrorField(null);
    setErrorMessage(null);
    setLoading(true);
    const response = await updateUser({
      psnId: psnId,
      xboxId: xboxId,
      paypal: paypal,
    });
    if (response.data?.updateUser.errors) {
      setErrorField(response.data.updateUser.errors[0].field);
      setErrorMessage(response.data.updateUser.errors[0].message);
    } else {
      setSucess(true);
    }
    setLoading(false);
  };

  useEffect(() => {

    if (user) {
      if (user.psnId) {
        setPsnId(user.psnId);
      }
      if (user.xboxId) {
        setXboxId(user.xboxId);
      }
      if (user.paypal) {
        setXboxId(user.paypal);
      }
    }
  }, [user]);

  const change = async () => {
    setErrorField(null);
    setErrorMessage(null);
    setLoading(true);
    const response = await changePassword({
      password: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });
    if (response.data?.changePassword.errors) {
      setErrorField(response.data.changePassword.errors[0].field);
      setErrorMessage(response.data.changePassword.errors[0].message);
    } else {
      setSucess(true);
    }
    setLoading(false);
  };


  return user && (
    <>
      <FeedbackModal
        title={"Success"}
        feedback={""}
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
        onClick={() => { }}
      />
      <PageHead title="Account" />
      <TopNavigation />

        <main className="min-h-screen bg-black grid grid-cols-12">
        <aside className="hidden md:flex flex-col mt-7 col-span-2 items-end text-white shadow mb-5">
          <SideNavigation />
        </aside>

          <div className="col-span-12 md:col-span-6 mt-5">
            <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
              <h1 className="text-base mb-2 md:text-lg text-white font-semibold uppercase">
                Account
              </h1>
              <Tab.Group
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
              >
                <Tab.List className="flex space-x-1 rounded-xl bg-dark p-1">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm lg:text-base font-medium leading-5 text-white",
                        selected
                          ? "bg-white shadow text-primary-focus font-semibold"
                          : "text-blue-100 hover:bg-black hover:text-white"
                      )
                    }
                  >
                    Profile
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm lg:text-base font-medium leading-5 text-white",
                        selected
                          ? "bg-white shadow text-primary-focus font-semibold"
                          : "text-blue-100 hover:bg-black hover:text-white"
                      )
                    }
                  >
                    Security
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2">
                  <Tab.Panel className="space-y-2">
                    <h1 className="text-base mb-2 md:text-lg text-white font-semibold uppercase">
                      Avatar:
                    </h1>
                    <div className="py-10 w-full text-center rounded-lg border shadow-md bg-dark border-dark">
                      <div className="flex flex-col space-y-5 items-center mx-5">

                        {
                          isUploading ? <ImageEditor /> :
                            <>
                              {user.avatar != null ? (

                                <Image
                                  src={user.avatar}
                                  width={100}
                                  height={100}
                                  objectFit={"cover"}
                                  className="rounded-md"
                                />
                              ) : (
                                <Image
                                  src="/images/profile.png"
                                  width={100}
                                  height={100}
                                  className="rounded-md"
                                />
                              )}

                              <Button
                                text={"Upload"}
                                textColor={"black"}
                                bgColor={"white"}
                                size={"medium"}
                                width={"most"}
                                onClick={() => setIsUploading(true)}
                              />
                            </>
                        }

                      </div>
                    </div>
                    <div className="p-4 w-full space-y-4 lg:space-y-5 text-center rounded-lg border shadow-md bg-dark border-dark text-sm">
                      <div className="grid grid-cols-6 gap-2 lg:gap-3">
                        <div className="col-span-6 sm:col-span-6">
                          <Input
                            label="Username"
                            type={"text"}
                            placeholder={"Username"}
                            value={user.username}
                            onChange={undefined}
                            disabled={true}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <Input
                            label="First name"
                            type={"text"}
                            placeholder={"First name"}
                            value={user.firstName}
                            onChange={undefined}
                            disabled={true}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <Input
                            label="Last name"
                            type={"text"}
                            placeholder={"Last name"}
                            value={user.lastName}
                            onChange={undefined}
                            disabled={true}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-6">
                          <Input
                            label="Email"
                            type={"email"}
                            placeholder={"Email"}
                            value={user.email}
                            onChange={undefined}
                            disabled={true}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-6">
                          <Input
                            label={"Paypal"}
                            type={"email"}
                            placeholder={
                              user.paypal
                                ? user.paypal
                                : "Paypal Email"
                            }
                            onChange={(e) => setPaypal(e.target.value)}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <Input
                            label="PSN"
                            type={"text"}
                            placeholder={
                              user.psnId
                                ? user.psnId
                                : "PSN"
                            }
                            onChange={(e) => setPsnId(e.target.value)}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <Input
                            label="XBOX gamertag"
                            type={"text"}
                            placeholder={
                              user.xboxId
                                ? user.xboxId
                                : "Xbox gamertag"
                            }
                            onChange={(e) => setXboxId(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          text={"Save"}
                          textColor={"white"}
                          bgColor={"black"}
                          size={"medium"}
                          width={"min"}
                          loading={loading}
                          onClick={() => update()}
                        />
                      </div>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel className="space-y-2">
                    <div className="p-4 w-full space-y-4 lg:space-y-5 text-center rounded-lg border shadow-md bg-dark border-dark text-sm">
                      <div className="mt-10 sm:mt-0">
                        <div className="my-3">
                          <Input
                            label="Current password"
                            type={"password"}
                            placeholder={"Current"}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div className="my-3">
                          <Input
                            label="New password"
                            type={"password"}
                            placeholder={"New"}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="my-3">
                        <Input
                          label="Confirm password"
                          type={"password"}
                          placeholder={"Confirm"}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Button
                          text={"Save"}
                          textColor={"white"}
                          bgColor={"black"}
                          size={"medium"}
                          width={"min"}
                          onClick={change}
                          loading={loading}
                        />
                      </div>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>

      
      <div className="hidden md:flex col-span-3 h-screen mt-5 pb-36">
              <Chat/>
        </div>
        </main>
      

      <FooterNavigation />
    </>
  );
};

export default Account;