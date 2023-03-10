import React from "react";
import { BiCool, BiSearchAlt2 } from "react-icons/bi";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { BsPaypal } from "react-icons/bs";
import { Mode, Platform } from "../generated/graphql";

export const options = [
  {
    id: 1,
    name: "Paypal",
    icon: BsPaypal,
  },
];

export const modes = [
  { id: 1, name: Mode.Open, icon: <BiSearchAlt2 /> },
  { id: 2, name: Mode.Challenge, icon: <BiCool /> },
];

export const bets = [5, 10, 20, 30, 50, 100, 200,300];


export const platforms = [
  { id: 1, name: Platform.Ps4, icon: <FaPlaystation /> },
  { id: 2, name: Platform.Ps5, icon: <FaPlaystation /> },
  { id: 3, name: Platform.Xboxone, icon: <FaXbox /> },
  { id: 4, name: Platform.Xboxseries, icon: <FaXbox /> },
];