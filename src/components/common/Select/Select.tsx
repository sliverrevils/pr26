"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowDown, CloseIco } from "@/icons/iconsSvg";

type SelectOption = {
    value: string;
    label: string;
    icon?: React.ReactNode;
};

type SelectProps = {
    value?: string;
    onChange?: (value: string) => void;
    onDropSelect?: () => void;
    onCloseSelect?: () => void;
    onAfterSelect?: () => void;
    options: SelectOption[];
    title?: string;
    error?: string;
    requiredTitle?: boolean;
    placeholder?: string;
    searchFiled?: boolean;
    className?: string;
    classNameWraper?: string;
};

//!ON useForm WITH CONTROLLER
export default function Select({
    options,
    value,
    onChange,
    title,
    requiredTitle,
    error,
    placeholder,
    searchFiled = true,
    onDropSelect,
    className = "",
    classNameWraper = "",
    onCloseSelect,
    onAfterSelect,
}: SelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const ref = useRef<HTMLDivElement>(null);

    const selected = options.find((o) => o.value === value) || null;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                onCloseSelect && onCloseSelect();
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filtered = options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));

    return (
        <div
            className={clsx(
                "flex flex-col gap-1 relative text-f-default cursor-pointer",
                classNameWraper ? classNameWraper : "",
            )}
        >
            {title && (
                <div className="flex gap-1 text-base">
                    <span>{title}</span>
                    {requiredTitle && <span className="text-f-purple">*</span>}
                </div>
            )}

            <div ref={ref}>
                <button
                    type="button"
                    onClick={() => setOpen((state) => !state)}
                    className={clsx(
                        "flex justify-between items-center w-full rounded-xl border px-4 py-1.5 h-12.5 bg-f-gray-4",
                        error ? "border-f-red-main" : "border-f-gray-5",
                        className ? className : "",
                    )}
                >
                    <div className="flex items-center gap-2 text-base">
                        <span>{selected?.icon}</span>
                        <span>{selected?.label || placeholder}</span>
                    </div>

                    {onDropSelect ? (
                        value ? (
                            <CloseIco
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDropSelect();
                                }}
                                className="cursor-pointer"
                            />
                        ) : (
                            <span className={clsx("transition", open && "rotate-180")}>
                                <ArrowDown />
                            </span>
                        )
                    ) : (
                        <span className={clsx("transition", open && "rotate-180")}>
                            <ArrowDown />
                        </span>
                    )}
                </button>

                {open && (
                    <div className="mt-1 rounded-lg border border-f-gray-5 bg-white  absolute left-0 top-full w-full z-10 shadow-2xl">
                        {searchFiled && (
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border-b border-f-gray-5 px-3 py-2 text-sm outline-none"
                                placeholder="search"
                            />
                        )}

                        <ul className="max-h-60 overflow-auto">
                            {filtered.map((option) => (
                                <li
                                    key={option.value}
                                    onClick={() => {
                                        onChange?.(option.value);
                                        setOpen(false);
                                        setSearch("");
                                        onAfterSelect && onAfterSelect();
                                    }}
                                    className="flex items-center cursor-pointer gap-2 px-4 py-3 hover:bg-gray-100 text-base"
                                >
                                    {option.icon}
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {error && (
                <div className="absolute left-0 bottom-0 translate-y-full text-xs text-f-red-main">
                    {error}
                </div>
            )}
        </div>
    );
}
