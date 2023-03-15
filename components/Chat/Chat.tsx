import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useAuth from "../../services/useAuth";
//TODO: uninstall this package when done
import Chance from "chance";
import { useNewPrivateMessageSubscription, useNewPublicMessageSubscription } from "../../generated/graphql";
import { useRouter } from "next/router";


const Chat = () => {
  //@ts-ignore
  const { user }: User = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const router = useRouter();
  const { id } = router.query;

  const [res] = id ? useNewPrivateMessageSubscription() : useNewPublicMessageSubscription();

  useEffect(() => {
    if(res.data) {
      console.log(res.data)
    }
  },[res,id])

  const ref = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setMessages([...messages,message]);
      ref.current.value = "";
      setMessage("");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
        let message = {
            name:Chance().name(),
            text:Chance().sentence()
        }
      setMessages((prevMessages) => [ 
        
        ...prevMessages,message
      ]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="hidden md:flex col-span-4 h-screen mt-5 mr-10 pb-36">
      <div className="bg-dark flex flex-col justify-between py-4 w-11/12 mx-1 px-1 rounded-md text-sm">
        <div className="flex flex-col overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch" ref={ref}>
          <h3 className="text-white text-center pb-1 text-base font-semibold">Public chat</h3>
          <div className="px-2">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <Message key={index} text={message.text} user={{
                      __typename: "User",
                      Wallet: {
                          __typename: "Wallet",
                          balance: 0,
                          createdAt: undefined,
                          id: 0,
                          updatedAt: undefined
                      },
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
                      username: message.name,
                      xboxId: ""
                  }} />
              ))
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-white text-lg lg:text-xl text-center">Send a message to start a conversation</p>
              </div>
            )}
          </div>
        </div>
        <div className="pt-4 sm:mb-0">
          <div className="flex items-center justify-between">
            <input
              ref={ref}
              type="text"
              placeholder="Send a message"
              className="block w-full py-2 pl-4 mx-1 bg-gray-800 focus:bg-chat-message border-2 border-dark focus:border-primary focus:bg-black duration-300 rounded-md outline-none text-white"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              required
            />

            <button
              className="bg-primary p-2 mx-1 text-white rounded-md hover:bg-primary-focus font-semibold uppercase"
              onClick={() => {
                setMessages([...messages, message]);
                ref.current.value = "";
                setMessage("");
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
