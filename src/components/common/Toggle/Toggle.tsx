"use client";

import clsx from "clsx";

type ChooseProps = {
    value?: boolean;
    onChange?: (value: boolean) => void;

    title?: string;
    error?: string;
    requiredTitle?: boolean;
    placeholder?: string;
    toggleText?: string;
};

export default function Toggle({
    value,
    onChange,
    title,
    requiredTitle,
    error,
    toggleText,
}: ChooseProps) {
    return (
        <div className="flex flex-col gap-1 relative text-f-default">
            {title && (
                <div className="flex gap-1 text-base">
                    <span>{title}</span>
                    {requiredTitle && <span className="text-f-purple">*</span>}
                </div>
            )}
            <div
                className={clsx(
                    "bg-f-gray-4 flex items-center justify-between w-full rounded-xl border px-4 py-1.5 h-12.5 select-none",
                    error ? "border-f-red-main" : "border-f-gray-5",
                )}
                onClick={() => onChange?.(!value)}
            >
                <div className="font-medium">{toggleText}</div>
                <div
                    className={clsx(
                        "w-14.5 h-full flex items-center p-1 text-white font-bold text-nowrap rounded-full cursor-pointer transition-all",
                        value
                            ? "bg-f-purple  justify-end"
                            : "bg-f-gray-button-disabled justify-items-start",
                    )}
                >
                    <div className="bg-white h-full rounded-full aspect-square ">1</div>
                </div>
            </div>

            {error && (
                <div className="absolute left-0 bottom-0 translate-y-full text-xs text-f-red-main">
                    {error}
                </div>
            )}
        </div>
    );
}
