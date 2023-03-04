import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { User, useSearchPlayerQuery } from "../../generated/graphql";
import Button from "../Shared/Button";
import Input from "../Shared/Input";
import Image from "next/image";
import NoData from "../Shared/NoData";

interface Props {
  setAwayPlayer: any;
  show: boolean;
  close: () => void;
}

//debounce hook
function useDebounceValue(value: string, time = 800) {
  const [debounceValue,setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
        setDebounceValue(value);
    }, time);
    
    return () => {
      clearTimeout(timer);
    }
  },[value,time]);
  
  return debounceValue;
}


const SearchPlayerModal = ({ setAwayPlayer, show, close }: Props) => {
  const closeButtonRef = useRef(null);

  const [username, setUsername] = useState<string>();
  const debounceValue = useDebounceValue(username);
  const [users, setUsers] = useState<User[]>();

  const [result,fetch] = useSearchPlayerQuery({
    variables: { username: debounceValue},
    pause:true
  });
  
  useEffect(() => {
    if (debounceValue == "" || debounceValue == null) setUsers(null)
    if(debounceValue) fetch();
    const { data } = result;
    if (data) {
      setUsers(data.searchPlayer);
    } else if (data && data.searchPlayer.length == 0) {
      setUsers(null);
    }
  }, [debounceValue]);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={closeButtonRef}
        onClose={() => close()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                <div className="bg-dark text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex flex-col text-xs lg:text-base">
                    <div className="col-span-6 sm:col-span-6">
                      <Input
                        label="Username"
                        type={"text"}
                        placeholder={"Username..."}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    {users && [
                      users.length > 0 ? (
                        <div className="my-5 space-y-3">
                          {users.map((user) => (
                            <div key={user.id} className="flex justify-between">
                              <div className="bg-dark rounded-md flex space-x-3">
                                <div className="w-14 h-14 ">


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
                                </div>
                                <h3 className="text-white self-center font-semibold">
                                  {user.username}
                                </h3>
                              </div>
                              <Button
                                  text={"select"}
                                  textColor={"white"}
                                  bgColor={"primary-focus"}
                                  size={"xsmall"}
                                  width={"xmin"}
                                  onClick={() => {
                                    setAwayPlayer(user);
                                    close();
                                  }}
                                />
                            </div>




                          ))}
                        </div>
                      ) : (
                        <NoData title={"No user found"} />
                      ),
                    ]}

                    <div className="flex justify-center space-x-2 pt-5">
                      <Button
                        text={"Close"}
                        textColor={"black"}
                        bgColor={"white"}
                        size={"medium"}
                        width={"xmin"}
                        onClick={() => close()}
                      />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SearchPlayerModal;
