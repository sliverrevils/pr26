"use client";
import Input from "@/components/common/Input/Input";
import { useState } from "react";

export default function UsersSearch({ className = "" }: { className?: string }) {
    const [search, setSearch] = useState("");
    return (
        <div
            className={`
            ${className}
        `}
        >
            <Input
                placeholder="Search user"
                className="bg-white"
                value={search}
                onChange={({ target: { value } }) => {
                    setSearch(() => value);
                }}
            />
        </div>
    );
}
