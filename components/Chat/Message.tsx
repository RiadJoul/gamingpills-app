import React from "react";
import { User } from "../../generated/graphql";


interface Props {
    user: User,
    text: string,
}


const Message = ({ text, user }: Props) => {
    //TODD: change styling for admin
    return (
        user &&
        <div
            className="text-sm py-1 px-1 rounded hover:bg-gray-500/30 leading-6"
        >
            <div className="inline-flex items-baseline">
            <p className=" text-gray-400 mr-1 text-xs">12:34 PM</p>
                <span className="font-bold text-primary mr-1">
                    {user.username}:
                </span>
            </div>
            <span className="break-words text-white">{text}</span>
        </div>
    )
}

export default Message;