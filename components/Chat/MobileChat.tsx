import React, { useEffect, useRef, useState } from "react";
import {
  Challenge,
  Status,
  useNewPrivateMessageSubscription,
  useNewPublicMessageSubscription,
  usePrivateMessagesQuery,
  usePublicMessagesQuery,
  User,
  useSendMessageMutation,
} from "../../generated/graphql";
import useAuth from "../../services/useAuth";
import Message from "./Message";
import { ImCross } from "react-icons/im";
import { Message as MessageType } from "../../generated/graphql";
import { useRouter } from "next/router";
import Error from "../shared/Error";

interface Props {
  challenge?: Challenge;
  isOpen: boolean;
  close: () => void;
}

const MobileChat = ({ isOpen, close, challenge }: Props) => {
  //@ts-ignore
  const { user }: User = useAuth();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const router = useRouter();
  const { id } = router.query;

  const variable = {
    id: typeof id === "string" ? id : null,
  };

  const [res] = id
    ? useNewPrivateMessageSubscription()
    : useNewPublicMessageSubscription();

  //graphql
  const [result] = id
    ? usePrivateMessagesQuery({ variables: variable })
    : usePublicMessagesQuery();
  const [, sendMessage] = useSendMessageMutation();

  //responses
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //getting messages
  useEffect(() => {
    if (result.data && !id) {
      //@ts-ignore
      setMessages(result.data.publicMessages);
    } else if (id && result.data) {
      //@ts-ignore
      setMessages(result.data.privateMessages);
    }
  }, [result]);

  //check for new messages
  useEffect(() => {
    if (res.data) {
      if (id) {
        //@ts-ignore
        if (res.data.newPrivateMessage.id != messages[messages.length - 1]?.id)
          //@ts-ignore
          setMessages([...messages, res.data.newPrivateMessage]);
      } else {
        //@ts-ignore
        if (res.data.newPublicMessage.id != messages[messages.length - 1]?.id)
          //@ts-ignore
          setMessages([...messages, res.data.newPublicMessage]);
      }
    }
  }, [res]);

  const ref = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      SendMessage();
    }
  };

  //sending message
  const SendMessage = async () => {
    ref.current.value = "";
    setMessage("");
    setErrorField(null);
    if (isEmptyOrSpaces(message)) return null;

    if (message.length > 250) {
      setErrorField("Message to long");
      setErrorMessage("Your message is too long");
      return;
    }

    if (id) {
      const response = await sendMessage({
        id: challenge.id,
        content: message,
      });
      if (response.data?.sendMessage.errors) {
        setErrorField(response.data.sendMessage.errors[0].field);
        setErrorMessage(response.data.sendMessage.errors[0].message);
      }
    } else {
      const response = await sendMessage({
        content: message,
      });
      if (response.data?.sendMessage.errors) {
        setErrorField(response.data.sendMessage.errors[0].field);
        setErrorMessage(response.data.sendMessage.errors[0].message);
      }
    }
  };

  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  //close if its desktop screen
  const handleResize = () => {
    if (window.innerWidth > 720) {
      close();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-dark  h-screen p-4 w-screen flex flex-col justify-between">
            <div className="flex flex-col overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
              <div className="flex sticky top-0 justify-between mb-3 bg-dark">
                <button
                  onClick={close}
                  className="text-white p-2 rounded-md"
                >
                  <ImCross />
                </button>
                <h3 className="text-white text-center pb-1 text-base font-semibold">
                  Public chat
                </h3>
              </div>
              <div className="px-2">
                {messages.length > 0 &&
                  messages.map((message) => (
                    <Message
                      user={message.user}
                      text={message.content}
                      createdAt={message.createdAt}
                    />
                  ))}
              </div>
            </div>
            <div className="pt-4 mb-10">
              {messages.length == 0 && (
                <p className=" text-gray-200 text-base text-left mx-2 mb-3">
                  {id
                    ? "You can chat with your opponent here!"
                    : "Welcome to chat!"}
                </p>
              )}
              {challenge && challenge.status == Status.Finished && (
                <p className=" text-gray-200 text-base text-left mx-2 mb-3">
                  Chat closed
                </p>
              )}
              {errorField && (
                  <Error message={errorField} description={errorMessage} />
                )}
              {challenge && challenge.status == Status.Active && (
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
                    onClick={() => SendMessage()}
                  >
                    Send
                  </button>
                </div>
              )}
              {
                !challenge && <div className="flex items-center justify-between">
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
                  onClick={() => SendMessage()}
                >
                  Send
                </button>
              </div>
              }
            </div>
          </div>
        </div>
    )
  );
};

export default MobileChat;
