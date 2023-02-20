import React from "react";
import { BiErrorCircle } from "react-icons/bi";

interface Props {
  message: string;
  description?: string;
}

const Error = (props: Props) => {
  return (
    <div
      className="flex p-4 mb-4 my-2 text-sm lg:text-base rounded-lg bg-red-200 text-red-800"
      role="alert"
    >
      <BiErrorCircle className="inline flex-shrink-0 mr-3 w-5 h-5" />

      <div className="capitalize">
        <span className="font-semibold mr-1">{props.message}</span>
        <span className="font-medium">| {props.description}</span>
      </div>
    </div>
  );
};

export default Error;
