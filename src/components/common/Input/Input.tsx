"use client";
import { InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
type Props = InputHTMLAttributes<HTMLInputElement> & {
    title?: string;
    error?: string;
    success?: string;
    hideBtn?: boolean;
    requiredTitle?: boolean;
    date?: boolean;
    className?: string;
};
export default function Input(props: Props) {
    const {
        title,
        error,
        hideBtn,
        requiredTitle = false,
        date = false,
        className,
        success,
        ...inputProps
    } = props;
    const [isHide, setIsHide] = useState(true);

    return (
        <div className="flex flex-col gap-1 relative">
            {title && (
                <div className="flex gap-1 text-base">
                    <span className="text-f-default">{title}</span>
                    {requiredTitle && <span className="text-f-purple">*</span>}
                </div>
            )}
            <div className="w-full relative">
                <input
                    {...inputProps}
                    className={`
                        w-full border bg-f-gray-4 rounded-xl  text-f-default text-base focus:outline-f-purple px-4 py-1.5 h-12.5
                        disabled:cursor-not-allowed
                        ${!!error ? "border-f-red-main" : "border-f-gray-5"} ${error && "focus:outline-f-red-main"} ${error && "focus:outline-f-red-main"}
                        ${className}
                        `}
                    {...(hideBtn ? { type: isHide ? "password" : "text" } : {})}
                    {...(date ? { type: "date" } : {})}
                />
                {hideBtn && (
                    <div
                        className={clsx(
                            "absolute right-2 top-1/2 -translate-y-1/2   text-white text-sm rounded-full px-2 py-1 cursor-pointer transition-colors",
                            isHide ? "bg-f-purple" : "bg-f-gray-button-disabled",
                        )}
                        onClick={() => setIsHide((state) => !state)}
                    >
                        {isHide ? "Show" : "Hide"}
                    </div>
                )}
            </div>
            {error && (
                <div className=" absolute left-0 bottom-0 translate-y-full text-f-red-main text-xs">
                    {error}
                </div>
            )}
            {success && (
                <div className=" absolute left-0 bottom-0 translate-y-full text-f-green-main text-xs">
                    {success}
                </div>
            )}
        </div>
    );
}
