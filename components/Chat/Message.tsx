import React from "react";
import { Role, User } from "../../generated/graphql";
import moment from "moment";
import { CgPill } from "react-icons/cg";

interface Props {
    user: User,
    text: string,
    createdAt: Date
}


const Message = ({ text, user, createdAt }: Props) => {
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
            <span className="break-words text-white">{
                    user.role == Role.Admin && <div className="flex">
                        <span className="flex items-center bg-black font-bold text-white p-1 rounded-lg"><CgPill className="mr-1 text-primary"/>ADMIN</span>
                    </div>
                }{text}</span>
        </div>
    )
}

export default Message;