import React from "react";
import { IconType } from "react-icons";

interface Props {
  title: string;
  icon: IconType;
  onClick?: () => void;
}

const FooterItem = (props: Props) => {
  return (
    <a
      onClick={props.onClick}
      className="w-full focus:text-primary-focus hover:text-primary-focus justify-center inline-block cursor-pointer text-center pt-2 pb-1"
    >
      <props.icon
        className="inline-block mb-1 h-7 w-7 text-primary"
        aria-hidden="true"
      />
      <span className="tab tab-home block text-sm text-white font-semibold">
        {props.title}
      </span>
    </a>

  );
};

export default FooterItem;
