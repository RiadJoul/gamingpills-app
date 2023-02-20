import React from "react";

interface Props {
  info: string;
  bgColor: "dark" | "black";
}

const backgroundColors = {
  dark: "bg-dark",
  black: "bg-black",
};

const Info = ({ info, bgColor }: Props) => {
  let backgroundClasses = backgroundColors[bgColor];
  return (
    <div
      className={`flex text-white text-sm text-center ${backgroundClasses} rounded-md p-3`}
    >
      <p>{info}</p>
    </div>
  );
};
export default Info;
