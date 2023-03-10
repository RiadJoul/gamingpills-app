import React, { useEffect, useRef, useState } from "react";
import { User } from "../../generated/graphql";
import useAuth from "../../services/useAuth";
import Message from "./Message";
import { ImCross } from "react-icons/im"
import Chance from "chance";

interface Props {
  isOpen: boolean,
  close: () => void;
}

const MobileChat = ({ isOpen, close }: Props) => {
  //TODO: handle null value in message
  //TODO: hanlde spam
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  //@ts-ignore
  const { user }: User = useAuth();
  //close if its desktop screen
  const handleResize = () => {
    if (window.innerWidth > 720) {
      close();
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prevMessages) => [
        Chance().sentence(),
        ...prevMessages,
      ]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  const ref = useRef(null);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setMessages([...messages, message]);
      ref.current.value = '';
      setMessage('')
    }
  }

  return (
    isOpen &&
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-dark  h-screen p-4 w-screen flex flex-col justify-between">
        <div className="flex flex-col overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
          <div className="flex justify-between mb-3 mt-5">
            <button onClick={close} className="bg-black text-white p-2 rounded-md"><ImCross /></button>
            <h3 className="text-white text-center pb-1 text-base font-semibold">Public chat</h3>
          </div>
          <div className="px-2">

            {
              messages.length > 0 ?
                messages.map((message, index) => (
                  <Message key={index} user={user} text={message} />
                ))
                :
                <div className="flex items-center justify-center">
                  <p className="text-white text-lg lg:text-xl text-center">Send a message to start a conversation</p>
                </div>
            }
          </div>


        </div>
        <div className="pt-4 mb-10">
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
            <button className="bg-primary p-2 mx-1 text-white rounded-md hover:bg-primary-focus font-semibold uppercase"
              onClick={() => {
                setMessages([...messages, message]);
                ref.current.value = '';
                setMessage('')
              }}
            >Send</button>

          </div>
        </div>
      </div>
    </div>

  )
}

export default MobileChat;
