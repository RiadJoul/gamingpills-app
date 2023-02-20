import React from "react";
import { BiLockAlt } from "react-icons/bi";
import { BsCash, BsHeadphones } from "react-icons/bs";


const Features = () => {
    return (
        <>
        <section className="bg-gradient-to-tr from-black to-dark">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="mb-8 lg:mb-16 text-center">
                <h2 className="mb-4 text-4xl font-extrabold text-white">Join the number one platform for FIFA wager matches and multiplayer tourneys in the world</h2>
                <p className="sm:text-xl text-gray-400">Here at <span className="text-primary">Gamingpills</span> we focus on making the player's experience better</p>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                <div className="bg-black p-4 rounded-lg">
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary lg:h-12 lg:w-12">
                       <BiLockAlt className="text-2xl"/>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">Secure</h3>
                    <p className="text-gray-400">When winning a wager through <span className="text-primary">Gamingpills</span> you are garenteed to get paid.</p>
                </div>
                <div className="bg-black p-4 rounded-lg">
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary lg:h-12 lg:w-12">
                       <BsCash className="text-2xl"/>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">Fast payments</h3>
                    <p className="text-gray-400">Fast payments and withdraws, usually it takes 2 - 3 bussiness days.</p>
                </div>
                <div className="bg-black p-4 rounded-lg">
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary lg:h-12 lg:w-12">
                       <BsHeadphones className="text-2xl"/>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">24/7 Customer supports</h3>
                    <p className="text-gray-400">We have a 24/7 support that can always assist you</p>
                </div>
            </div>
        </div>
    </section>

        
        </>
    )
}

export default Features;