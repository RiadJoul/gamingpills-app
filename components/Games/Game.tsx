import React from "react";
import Image from "next/image";
interface Props {
  name: string;
  category: string;
  src: string;
}
const Game = ({ name, category, src }: Props) => {
  return (
    <li className="flex flex-col items-center">
      {
        src &&
        <Image
          src={src}
          width={150}
          height={200}
          className="mb-2 rounded-lg"
          layout="fixed"
        /> 
      }
      <h4 className="lg:text-base text-sm text-white italic font-bold uppercase mt-1">
        {name}
      </h4>
      <h4 className="lg:text-sm text-xs text-gray-50">{category}</h4>
    </li>
  );
};

export default Game;