import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Chat from "../../components/Chat/Chat";
import Image from "next/image";
import SideNavigation from "../../components/Navigation/SideNavigation";
import TopNavigation from "../../components/Navigation/TopNavigation";
import PageHead from "../../components/Shared/PageHead";
import { Category } from "../../generated/graphql";
import { useIsAuth } from "../../services/useIsAuth";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const Games = () => {
    useIsAuth();
    const router = useRouter();
    const { index } = router.query;

    const [selectedIndex, setSelectedIndex] = useState(index ? index : 0);



    return (
        <>
            <PageHead title="Players" />
            <TopNavigation />
            <main className="min-h-screen bg-black grid grid-cols-12">
                <aside className="hidden md:flex flex-col mt-5 col-span-2 items-end text-white shadow mb-5">
                    <SideNavigation />
                </aside>
                <div className="col-span-12 md:col-span-7 mt-5">
                    <div className="flex flex-col justify-center mx-3 lg:mx-5 pb-16">
                        <div className="space-y-2">
                            <h1 className="text-white text-2xl font-bold">Games</h1>
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
                                        Games
                                    </Tab>
                                </Tab.List>
                                {
                                    <>



                                        <Tab.Panels className="mt-2 mb-20">
                                            <Tab.Panel className="space-y-2">
                                                <div className="w-full overflow-x-auto mx-auto  shadow-xl">
                                                    <div className="flex flex-col">
                                                        <div className="flex">
                                                            <ul className="flex items-center justify-center space-x-4">

                                                                <Game

                                                                    name={"FIFA 23"}
                                                                    category={Category.Sports} src={"/public/images/secure.png"}
                                                                />
                                                                

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Panel>
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

export default Games;


interface Props {
    name: string;
    category: string;
    src: string;
}
const Game = ({ name, category, src }: Props) => {
    return (
        <li className="flex flex-col items-center">
            {
                src &&
                <Image
                    src={src}
                    width={150}
                    height={200}
                    className="mb-2 rounded-lg"
                    layout="fixed"
                />
            }
            <h4 className="lg:text-base text-sm text-white italic font-bold uppercase mt-1">
                {name}
            </h4>
            <h4 className="lg:text-sm text-xs text-gray-50">{category}</h4>
                <button className="bg-gray-600 p-2 mx-1 mt-5 text-white rounded-md hover:bg-primary-focus"
                    onClick={() => { }}
                >Modify</button>

        </li>
    );
};