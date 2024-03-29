import React from "react";
import { IconType } from "react-icons";

interface Props {
  text?: string;
  textColor: string;
  bgColor: string;
  size: "xsmall" | "small" | "medium" | "large";
  width: "full" | "half" | "most" | "min" | "xmin";
  icon?: IconType;

  loading?: boolean;
  disabled?: boolean;
  onClick: any;
}

const backgroundColors = {
  primary: "bg-primary hover:bg-primary-focus",
  "primary-focus": "bg-primary-focus hover:bg-primary",
  black: "bg-black",
  dark: "bg-dark",
  white: "bg-white",
  red: "bg-red-600 hover:bg-red-900",
  green: "bg-green-600 hover:bg-green-900"
};

const textColors = {
  primary: "text-primary",
  "primary-focus": "text-primary-focus",
  white: "text-white",
  black: "text-black",
  dark: "text-dark",
  green: "text-green-700",
  red:"text-red-700"
};

const sizes = {
  xsmall: "px-0.5 py-0.5",
  small: "px-1 py-1",
  medium: "px-2 py-2",
  large: "px-3 py-3",
};

const widths = {
  full: "w-full",
  half: "w-1/2",
  most: "w-full lg:w-2/3",
  min: "w-1/3",
  xmin: "w-1/4"
};

const Button = (props: Props) => {
  let textColorClasses = textColors[props.textColor];
  let bgcolorClasses = backgroundColors[props.bgColor];
  let widthClasses = widths[props.width];
  let sizeClasses = sizes[props.size];

  return (
    <button
      type="button"
      disabled={props.loading || props.disabled}
      onClick={props.onClick}
      className={`flex items-center justify-center text-sm lg:text-base font-semibold
        border border-transparent rounded-md shadow-sm capitalize
        text-center transition duration-800 ease-in-out transform hover:opacity-70
        ${bgcolorClasses} ${textColorClasses} ${widthClasses} ${sizeClasses}`}
    >
      {props.icon && !props.loading && (
        <props.icon
          className={`flex-shrink-0 mr-1 h-5 w-5 text-${textColorClasses}`}
          aria-hidden="true"
        />
      )}
      {props.loading ? (
        <svg
          role="status"
          className={`w-6 h-6 mr-2 text-gray-200 animate-spin fill-dark`}
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      ) : (
        props.text
      )}
    </button>
  );
};

export default Button;
