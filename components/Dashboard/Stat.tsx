import React from "react";
import { IconType } from "react-icons";

interface Props {
    title:string,
    amount:number | string,
    icon?:IconType
}

const Stat = (props:Props) => {
    return (
        <div className="bg-dark rounded-md px-4 mx-2 py-2 text-white">
            <div className="flex justify-between space-x-10 text-base lg:text-xl items-center">
                <h3>{props.title}:</h3>
                {
                    props.icon &&
                <props.icon className="text-4xl"/>
                }
            </div>
            <div className="text-base lg:text-xl text-green-800">
                <h3>{props.amount}</h3>
            </div>
        </div>
    )
}

export default Stat;