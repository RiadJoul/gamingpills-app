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
        <div className="flex space-x-1 text-white items-start">
            <span className="text-gray-300 font-semibold text-xs mt-0.5">1 min ago</span> <p className="text-primary pr-1">{user.username}</p>:<span className="text-white">{text}</span>
        </div>

    )
}

export default Message;