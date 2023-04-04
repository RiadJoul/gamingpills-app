import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Chat from "../../components/Chat/Chat";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import Input from "../../components/shared/Input";
import PageHead from "../../components/shared/PageHead";
import useAuth from "../../services/useAuth";
import { User } from "../../generated/graphql";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const Account = () => {
    const router = useRouter();
    const { index } = router.query;

    const [selectedIndex, setSelectedIndex] = useState(index ? index : 0);

    //@ts-ignore
    const { user }: User = useAuth();

    return (
        <>
            <PageHead title="Account" />
            <TopNavigation />
            <main className="min-h-screen bg-black grid grid-cols-12">
                <aside className="hidden md:flex flex-col mt-5 col-span-2 items-end text-white shadow mb-5">
                    <SideNavigation />
                </aside>
                <div className="col-span-12 md:col-span-7 mt-5">
                    <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
                        <div className="space-y-2">
                            <h1 className="text-white text-2xl font-bold">Account</h1>
                            <Tab.Group
                                //@ts-ignore
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
                                        Account
                                    </Tab>
                                </Tab.List>
                                {
                                    <>



                                        <Tab.Panels className="mt-2 mb-20">
                                            {
                                                user &&
                                                <Tab.Panel className="space-y-2">
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



                                                        </div>

                                                        <div className="flex justify-center">

                                                        </div>
                                                    </div>
                                                </Tab.Panel>
                                            }
                                        </Tab.Panels>

                                    </>
                                }
                            </Tab.Group>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex col-span-3 mx-5 h-screen mt-5 pb-36">
                    <Chat />
                </div>
            </main>
        </>
    )
}

export default Account;