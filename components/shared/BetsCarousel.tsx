import { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"
import { FaRegMoneyBillAlt } from "react-icons/fa";
import calculateProfit from "../../services/Fee";

interface Props {
  bets: number[]
  setBet: (bet: number) => void,
}

export default function BetsCarousel({ bets, setBet }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const selectedOption = bets[currentIndex];

  const handlePrev = () => {
    setFadeOut(true);
    setTimeout(() => {
      setCurrentIndex((currentIndex - 1 + bets.length) % bets.length);
      setFadeOut(false);
    }, 200);
  };

  const handleNext = () => {
    setFadeOut(true);
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % bets.length);
      setFadeOut(false);
    }, 200);
  };

  useEffect(() => {
    setBet(selectedOption)
  }, [selectedOption])

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button type="button" onClick={handlePrev} className="text-primary ">
          <BsFillArrowLeftCircleFill className="h-6 w-6" />
        </button>

        <p
          className={`flex items-center text-white text-xl font-semibold text-center transition-opacity duration-200 ${fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
          <FaRegMoneyBillAlt className="text-green-600 mr-3" />${selectedOption}
        </p>
            
        <button type="button" onClick={handleNext} className="text-primary ">
          <BsFillArrowRightCircleFill className="h-6 w-6" />
        </button>
      </div>
        <p className="font-bold text-4xl text-white">|</p>
      <p className="text-primary text-xl font-bold uppercase"><span className="text-white font-semibold text-lg">winner gets</span> ${calculateProfit(selectedOption)}</p>
    </div>

  );
}





