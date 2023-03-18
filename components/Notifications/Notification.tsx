import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { GiCrossedSabres, GiPill } from "react-icons/gi";
import { MdSportsScore } from "react-icons/md";
import { Notification, useMarkNotificationAsReadMutation } from "../../generated/graphql";
import FeedbackModal from "../Modals/FeedbackModal";

interface Props {
    notification: Notification
}




const Notification = ({ notification }: Props) => {
    const router = useRouter();
    //graphql
    const [, markNotificationAsRead] = useMarkNotificationAsReadMutation();

    //responses
    const [errorField, setErrorField] = useState<string>(null);
    const [errorMessage, setErrorMessage] = useState<string>(null);

    const getNavigation = (title: string) => {
        switch (title) {
            case "Challenge Accepted":
                return "/player/matches?index=0"
                break;
            case "Challenge":
                return "/player/matches?index=1"
                break;
            case "Challenge Completed":
                return "/player/matches?index=2"
                break;
            case "Funds":
                return "/player/wallet"
                break;
            case "Challenge Disputed":
                return "/player/disputes"
                break;
            case "Score uploaded":
                return "/player/matches"
                break;
            default:
                return "/player/feed"
                break;
        }
    }


    const MarkNotificationAsRead = async (id: number) => {
        const response = await markNotificationAsRead({ id: id });
        if (response.data?.markNotificationAsRead.errors) {
            setErrorField(response.data.markNotificationAsRead.errors[0].field);
            setErrorMessage(response.data.markNotificationAsRead.errors[0].message);
        } else {
            router.push(getNavigation(notification.title))
        }
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
            <div
                className={`${notification.isRead ? "bg-white" : "bg-gray-200"} cursor-pointer -m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100`}
            >
                <div className="flex h-10 w-10 shrink-0 items-center bg-primary-focus rounded-lg justify-center text-white text-3xl sm:h-12 sm:w-12">
                    {
                        notification.title.includes("Challenge") && <GiPill />
                    }
                    {
                        notification.title.includes("Invite") && <GiPill />
                    }
                    {
                        notification.title.includes("Funds") && <BsCashCoin />
                    }
                    {
                        notification.title.includes("Dispute") && <GiCrossedSabres />
                    }
                    {
                        notification.title.includes("Score") && <MdSportsScore />
                    }
                </div>
                <div className="ml-4 capitalize" onClick={() => MarkNotificationAsRead(notification.id)}>

                    <p className="lg:text-base text-sm font-semibold text-gray-900">
                        {notification.title}
                    </p>

                    <p className="lg:text-base text-sm font-semibold text-gray-500">
                        {notification.message}
                    </p>
                    <p className="lg:text-sm text-sm text-gray-700">
                        {moment(notification.createdAt).fromNow()}
                    </p>
                </div>
            </div>
        </>

    )
}

export default Notification;