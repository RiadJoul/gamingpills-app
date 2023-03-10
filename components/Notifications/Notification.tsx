import moment from "moment";
import Link from "next/link";
import React from "react";
import { BsCashCoin } from "react-icons/bs";
import { GiCrossedSabres, GiPill } from "react-icons/gi";
import { MdSportsScore } from "react-icons/md";
import { Notification } from "../../generated/graphql";

interface Props {
    notification: Notification
}

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

const Notification = ({ notification }: Props) => {

    return (
        <div
            className={`cursor-pointer -m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100`}
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
            <Link href={getNavigation(notification.title)}>
                <div className="ml-4 capitalize">

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
            </Link>
        </div>
    )
}

export default Notification;