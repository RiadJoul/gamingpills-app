import React from "react";
import { RiGamepadLine } from "react-icons/ri";
interface Props {
  title: string;
  description?: string;
}

const NoData = ({ title, description }: Props) => {
  return (
    <div className="p-4 w-full text-center rounded-md border shadow-md bg-dark border-dark">
      <div className="my-3 flex items-center justify-center lg:my-10">
        <div className="text-center text-white space-y-3">
          <div className="flex justify-center space-x-10 text-primary text-4xl lg:text-5xl">
            <RiGamepadLine />
            <RiGamepadLine />
            <RiGamepadLine />
          </div>
          <h1 className="lg:text-xl text-lg text-center font-bold">
            {title}
          </h1>
          {description && (
            <p className="text-center text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoData;
