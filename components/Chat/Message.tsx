import React from "react";
import { User } from "../../generated/graphql";
import moment from "moment";

interface Props {
    user: User,
    text: string,
    createdAt:Date
}


const Message = ({ text, user,createdAt}: Props) => {
    //TODD: change styling for admin
    
    return (
        user &&
        <div
            className="text-sm py-0.5 px-1 rounded hover:bg-gray-500/30 leading-6"
        >
            <div className="inline-flex items-baseline">
            <p className=" text-gray-400 mr-1 text-xs">{moment(createdAt).fromNow()}</p>
                <span className="font-bold text-primary mr-1">
                    {user.username}:
                </span>
            </div>
            <span className="break-words text-white">{text}</span>
        </div>
    )
}

export default Message;