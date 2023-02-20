import React from "react";
import { FaPlaystation, FaXbox } from "react-icons/fa";

const Platforms = () => {
    return (
        <section className="bg-black">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-8">
                <h2 className="mb-8 text-3xl font-extrabold tracking-tight leading-tight text-center lg:mb-8 text-white md:text-4xl">supports</h2>
                <div className="flex flex-wrap items-center space-x-20 justify-center text-gray-400">
                    <div className="text-blue-900 p-4 rounded-lg text-8xl">
                        <FaPlaystation />
                    </div>
                    <div className="text-green-700 p-4 rounded-lg text-7xl">
                        <FaXbox />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Platforms;