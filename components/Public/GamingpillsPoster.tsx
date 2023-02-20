import React from "react";
import Image from "next/image";
import gamingpills from "../../public/images/logo/gamingpills.svg";

const GamingpillsPoster = () => {
    return (
        <div className="lg:flex hidden lg:w-1/2 bg-gradient-to-tr from-black to-dark items-center">
          <div className="flex w-full flex-col justify-center text-center">
            <Image
              className="rounded-full"
              src={gamingpills}
              width={220}
              height={100}
            />
            <h1 className="text-white font-bold text-4xl font-sans mt-5">
              Gamingpills
            </h1>
            <p className="text-white mt-1 text-2xl">
              The Leading Wagering Platform for gamers
            </p>
            <p className="text-white mt-2 text-lg italic">
              Built for gamers by gamers
            </p>
          </div>
        </div>
    )
}

export default GamingpillsPoster;