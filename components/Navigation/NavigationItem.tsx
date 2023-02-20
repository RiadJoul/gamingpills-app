import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface props {
  title: string;
  href: string;
  icon: IconType;
}
const NavigationItem = (props: props) => {
  return (
    <Link href={props.href}>
      <a
        key={props.title}
        className="-m-3 p-3 flex items-center rounded-md hover:bg-black"
      >
        <props.icon
          className="flex-shrink-0 h-6 w-6 text-primary"
          aria-hidden="true"
        />
        <span className="ml-3 text-base font-medium text-white">
          {props.title}
        </span>
      </a>
    </Link>
  );
};

export default NavigationItem;
