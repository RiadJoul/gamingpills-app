import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface Props {
  message: string;
  description?: string;
}

const Success = (props: Props) => {
  return (
    <div
      className="flex p-4 text-sm lg:text-base rounded-lg bg-green-200 text-green-800"
      role="alert"
    >
      <AiOutlineCheckCircle className="inline flex-shrink-0 mr-3 w-5 h-5"/>

      <div className="capitalize">
        <span className="font-semibold mr-3">{props.message}</span> {props.description}
      </div>
    </div>
  );
};

export default Success;