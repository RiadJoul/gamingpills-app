import React from "react";

interface Props {
    title:string,
    amount:number | string,
    icon?:JSX.Element
    onClick?: () => void
    active?:boolean
}

const StatCard = ({title,amount,icon, onClick, active}:Props) => {
    return (
        <div onClick={onClick} className={`${active ? "bg-slate-900" : "bg-dark"} ${onClick && !active && "hover:opacity-80 cursor-pointer"}  rounded-lg px-4 mx-2 py-2 text-white`}>
            <div className="flex flex-col">
                <h4 className="text-primary text-4xl">{icon}</h4>

                <h1 className="py-2 font-bold text-xl text-gray-300">{title}</h1>
                <p className="font-semibold text-xl">{amount}</p>
            </div>
        </div>
    )
}

export default StatCard;