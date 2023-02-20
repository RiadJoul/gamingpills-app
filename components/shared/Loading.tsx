import React from 'react'
import { RiGamepadLine } from 'react-icons/ri';


const Loading = () => {
    return (
        <div className="p-4 w-full text-center rounded-md border shadow-md bg-dark border-dark">
      <div className="my-5 flex items-center justify-center lg:my-10">
        <div className="text-center text-white space-y-3">
          <div className="flex justify-center space-x-10 text-primary text-4xl lg:text-5xl animate-bounce">
            <RiGamepadLine />
            <RiGamepadLine />
            <RiGamepadLine />
          </div>
        </div>
      </div>
    </div>
    )
}

export default Loading;