import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Message from "./Message";


interface Props {
  isOpen: boolean,
  close: () => void;
}

const MobileChat = ({ isOpen, close }: Props) => {
  //TODO: handle null value in message
  //TODO: hanlde spam
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  //close if its desktop screen
  const handleResize = () => {
    if (window.innerWidth > 720) {
      close();
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })



  const ref = useRef(null);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setMessages([...messages, message]);
      ref.current.value = '';
      setMessage('')
    }
  }

  return (

    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 max-h-screen"

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
              <Dialog.Panel className="relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                <div className="bg-dark flex flex-col justify-between py-4 w-full mx-1 px-1 rounded-md text-sm">

                  <div className="flex flex-col overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    <div className="flex justify-between text-white text-center text-lg font-semibold mb-5 px-5">

                      <h3>Public chat</h3>

                      <FaTimes onClick={close} />
                    </div>
                    <div className="px-2">

                      {
                        messages.length > 0 ?
                          messages.map((message, index) => (
                            <Message key={index} text={message} user={{
                              __typename: "User",
                              avatar: "",
                              banned: false,
                              birthDate: undefined,
                              createdAt: undefined,
                              email: "",
                              emailVerified: false,
                              firstName: "",
                              id: "",
                              lastName: "",
                              lastSeen: undefined,
                              password: "",
                              paypal: "",
                              psnId: "",
                              updatedAt: undefined,
                              username: "Hamid",
                              xboxId: ""
                            }} />
                          ))
                          :
                          <div className="flex items-center justify-center">
                            <p className="text-white text-base text-center">Send a message to start a conversation</p>
                          </div>
                      }
                    </div>


                  </div>
                  <div className="pt-4 sm:mb-0">
                    <div className="flex items-center justify-between">
                      <input
                        ref={ref}
                        type="text"
                        placeholder="Send a message"
                        className="block w-full py-2 pl-4 mx-1 bg-gray-800 focus:bg-chat-message border-2 border-dark focus:border-primary focus:bg-black duration-300 rounded-md outline-none text-white"
                        onChange={(e) => { setMessage(e.target.value); }}
                        onKeyDown={handleKeyDown}
                        required
                      />
                      <button className="bg-primary p-2 mx-1 text-white rounded-md hover:bg-primary-focus"
                        onClick={() => {
                          setMessages([...messages, message]);
                          ref.current.value = '';
                          setMessage('')
                        }}
                      >Send</button>
                    </div>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

  )
}

export default MobileChat;