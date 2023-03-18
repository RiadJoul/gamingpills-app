import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useAuth from "../../services/useAuth";
import { Message as MessageType, useNewPrivateMessageSubscription, useNewPublicMessageSubscription, usePrivateMessagesQuery, usePublicMessagesQuery, useSendMessageMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import FeedbackModal from "../Modals/FeedbackModal";

interface Props {
  challengeId?: string
}

const Chat = ({ challengeId }: Props) => {
  //@ts-ignore
  const { user }: User = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const router = useRouter();
  const { id } = router.query;

  const variable = {
    id: typeof id === "string" ? id : null,
  };

  const [res] = id ? useNewPrivateMessageSubscription() : useNewPublicMessageSubscription();

  //graphql
  const [result] = id ? usePrivateMessagesQuery({ variables: variable }) : usePublicMessagesQuery();
  const [, sendMessage] = useSendMessageMutation();

  //responses
  const [errorField, setErrorField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //getting messages
  useEffect(() => {
    if (result.data && !id) {
      //@ts-ignore
      setMessages(result.data.publicMessages)
    } else if (id && result.data) {
      //@ts-ignore
      setMessages(result.data.privateMessages)
    }
  }, [result])


  //check for new messages
  useEffect(() => {

    if (res.data) {
      if (id) {
        //@ts-ignore
        if (res.data.newPrivateMessage.id != messages[0]?.id)
          //@ts-ignore
          setMessages([...messages, res.data.newPrivateMessage]);
      } else {
        //@ts-ignore
        if (res.data.newPublicMessage.id != messages[0]?.id)
          //@ts-ignore
          setMessages([...messages, res.data.newPublicMessage]);
      }

    }
  }, [res])

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
    if (isEmptyOrSpaces(message)) return null;

    if (id) {
      const response = await sendMessage({
        id: challengeId,
        content: message
      });
      if (response.data?.sendMessage.errors) {
        setErrorField(response.data.sendMessage.errors[0].field);
      setErrorMessage(response.data.sendMessage.errors[0].message);
      }
    } else {
      const response = await sendMessage({
        content: message
      });
      if (response.data?.sendMessage.errors) {
        setErrorField(response.data.sendMessage.errors[0].field);
        setErrorMessage(response.data.sendMessage.errors[0].message);
      }
    }

  }

  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }




  return (
    <>
      <FeedbackModal
        title={errorField}
        feedback={errorMessage}
        type={"error"}
        cancelText={"Close"}
        show={errorField ? true : false}
        close={() => setErrorField(null)}
      />
      <div className="hidden md:flex col-span-3 h-screen mt-5 mr-10 pb-36">
        <div className="bg-dark flex flex-col justify-between py-4 w-11/12 mx-1 px-1 rounded-md text-sm">
          <div className="flex flex-col overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch" ref={ref}>
            <h3 className="text-white text-center pb-1 text-base font-semibold">{challengeId ? "Private chat" : "Public chat"}</h3>
            <div className="px-2">
              {messages.length > 0 && (
                messages.map((message) => (
                  <Message user={message.user} text={message.content} createdAt={message.createdAt} />
                ))
              )}
            </div>
            
          </div>
          
          <div className="pt-4 sm:mb-0">
            { messages.length == 0 &&
              <p className=" text-gray-200 text-base text-left mx-2 mb-3">{id ? "You can chat with your opponent here!" : "Welcome to chat!"}</p>
            }
          
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
                  SendMessage();
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

    </>

  );
};

export default Chat;
