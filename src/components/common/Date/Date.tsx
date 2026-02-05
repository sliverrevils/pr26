"use client";

import { CalendarIco } from "@/icons/iconsSvg";
import dayjs from "dayjs";
import { input } from "framer-motion/client";
import { Dispatch, InputHTMLAttributes, SetStateAction, useEffect, useRef, useState } from "react";

export default function Date({
    className,
    setMainDate,
    mainDateValue,
    ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
    mainDateValue?: string;
    setMainDate?: Dispatch<SetStateAction<string>>;
}) {
    const [date, setDate] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div
            onClick={() => inputRef.current?.showPicker()}
            className={`relative  flex items-center gap-2 w-full border border-f-gray-5 bg-white rounded-xl  text-f-default text-base px-4 py-1.5 h-12.5 cursor-pointer
                ${className}
                `}
        >
            <input
                ref={inputRef}
                type="date"
                value={mainDateValue || date}
                {...inputProps}
                className="w-0 h-0  absolute bottom-0"
                onChange={(e) => {
                    const date = dayjs(e.target.value).toISOString();
                    setDate(date);
                    setMainDate && setMainDate(date);
                }}
            />
            <CalendarIco />
            <div className="text-f-gray-3">
                {date ? dayjs(date).format("DD.MM.YYYY") : inputProps.placeholder}
            </div>
        </div>
    );
}
