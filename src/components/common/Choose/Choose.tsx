"use client";

import clsx from "clsx";
import { useState } from "react";

type SelectOption = {
    value: string | number;
    label: string;
    icon?: React.ReactNode;
};

type ChooseProps = {
    value?: string | number;
    onChange?: (value: string | number) => void;
    options: SelectOption[];
    title?: string;
    error?: string;
    requiredTitle?: boolean;
    placeholder?: string;
    chooseText?: string;
};

//!ON useForm WITH CONTROLLER
export default function Choose({
    value,
    onChange,
    title,
    requiredTitle,
    error,
    chooseText,
    options = [],
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
                    "bg-f-gray-4 flex items-center justify-between w-full rounded-xl border px-4 py-1.5 h-12.5",
                    error ? "border-f-red-main" : "border-f-gray-5",
                )}
            >
                <div className="font-medium">{chooseText}</div>
                <div className="flex gap-2 h-full">
                    {options.map((item) => (
                        <div
                            key={item.value}
                            className={clsx(
                                "h-full flex items-center gap-2 px-3 text-white font-bold text-nowrap rounded-full cursor-pointer transition-colors",
                                item.value === value ? "bg-f-purple" : "bg-f-gray-button-disabled",
                            )}
                            onClick={() => onChange?.(item.value)}
                        >
                            {item.icon}
                            {item.label}
                        </div>
                    ))}
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
