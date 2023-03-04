import React from "react";
import Button from "./Button";

interface Props {
    text: string,
    ctaText?: string,
    cta?: () => void,
    loading?: boolean
}

const Alert = ({ text, ctaText, cta ,loading}: Props) => {
    return (
        <div className="flex justify-between px-5 py-2 items-center rounded-md bg-primary-focus capitalize text-sm lg:text-base">
            <p className="text-white">{text}</p>
            {
                ctaText && <Button textColor={"white"} bgColor={"dark"} size={"small"} width={"xmin"} text={ctaText} onClick={cta} loading={loading} />
            }
        </div>
    )
}

export default Alert;