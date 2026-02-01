"use client";

import { useMemo } from "react";
import OponentCardSkeletont from "../OponentCard/OponentCardSkeleton";

export default function MatchSkeleton({
    count = 1,
    className = "",
}: {
    count?: number;
    className?: string;
}) {
    const html = (_: any, idx: number) => (
        <div key={idx + "_matchSceleton"} className="bg-f-gray-4 p-4 rounded-2xl animate-pulse ">
            <div className="text-center">
                <div className="h-5 w-2/3 mx-auto rounded-md bg-f-gray-3" />
            </div>
            <div className="flex justify-between items-center mt-4">
                <OponentCardSkeletont />
                <div className="flex items-center gap-2">
                    <div className="h-14 w-10 rounded-md bg-f-gray-3" />
                    <div className="h-14 w-4 rounded-md bg-f-gray-3" />
                    <div className="h-14 w-10 rounded-md bg-f-gray-3" />
                </div>
                <OponentCardSkeletont />
            </div>
        </div>
    );

    return <div className={`${className} animate-fade-in`}>{Array(count).fill("").map(html)}</div>;
}
